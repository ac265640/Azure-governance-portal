// src/services/aiService.js
import api from './api';
import axios from 'axios';

const mockResponses = {
  'idle resources': `## Idle Resources Found\n\nI found **14 idle resources** across your subscriptions:\n\n| Resource | Type | Idle Days | Owner |\n|---|---|---|---|\n| storage-backup-central | Storage Account | 117 days | Priya Nair |\n| lb-api-gateway | Load Balancer | 168 days | Anjali Mehta |\n| vm-dev-test-02 | Virtual Machine | 120 days | Vikram Singh |\n\n**Recommendation:** Consider reclaiming resources idle for 90+ days to reduce costs.`,
  'vms': `## Virtual Machines Inventory\n\nYou have **18 Virtual Machines** across all subscriptions:\n\n- **Active:** 12 VMs\n- **Idle:** 4 VMs  \n- **Candidates for reclamation:** 2 VMs\n\nTop VMs by cost: vm-prod-east-01, vm-dev-test-02\n\nWould you like me to show detailed specs?`,
  'reclamation candidates': `## Reclamation Candidates\n\nBased on usage patterns, I recommend reclaiming these resources:\n\n1. **vm-dev-test-02** — 120 days idle, saves ~$240/month\n2. **ci-batch-worker** — 82 days idle, saves ~$80/month\n3. **storage-backup-central** — 117 days idle, saves ~$45/month\n\n**Total potential savings: ~$365/month**`,
  'governance report': `## Governance Summary Report\n\n**Generated:** ${new Date().toLocaleDateString()}\n\n### Resource Health\n- ✅ Active: 38 (61%)\n- ⚠️ Idle: 14 (23%)\n- 🔴 Candidates: 6 (10%)\n\n### Cost Optimization\n- Estimated monthly waste: **$1,240**\n- Reclamation savings opportunity: **$865/month**\n\n### Compliance\n- Resources without owners: 2\n- Resources without tags: 8\n\n### Recommendations\n1. Reclaim 6 flagged resources\n2. Assign owners to untagged resources\n3. Review Dev-004 subscription utilization`,
};

const getDefaultResponse = (message) =>
  `I've analyzed your query: **"${message}"**\n\nHere's what I found in your Azure environment:\n\n- Your portal currently manages **62 resources** across **9 resource groups**\n- **5 active subscriptions** with a combined monthly spend tracked\n\nFor specific queries, try:\n- "Show idle resources"\n- "List all VMs"\n- "Recommend reclamation candidates"\n- "Generate governance report"`;

const aiService = {
  chat: async (message) => {
    try {
      // 1. If OpenAI Key is present, query OpenAI directly
      const openAiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (openAiKey && openAiKey.trim() !== '') {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: 'You are an Azure Cloud Governance & Cost Reclamation assistant for the ARGRP portal. Guide the user professionally. Assume the environment has: 62 total resources (38 active, 14 idle, 6 reclamation candidates), 9 resource groups, and 5 subscriptions.'
              },
              { role: 'user', content: message }
            ],
            temperature: 0.7,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${openAiKey}`
            }
          }
        );
        return {
          success: true,
          data: {
            response: response.data.choices[0].message.content,
            timestamp: new Date().toISOString()
          }
        };
      }

      // 2. Fallback to teammate's backend route
      const res = await api.post('/ai/chat', { message });
      return { success: true, data: res.data };
    } catch {
      // 3. Fallback to local mock responses
      await new Promise(r => setTimeout(r, 1200));
      const lower = message.toLowerCase();
      let response = getDefaultResponse(message);
      if (lower.includes('idle')) response = mockResponses['idle resources'];
      else if (lower.includes('vm') || lower.includes('virtual machine')) response = mockResponses['vms'];
      else if (lower.includes('reclamation') || lower.includes('candidate')) response = mockResponses['reclamation candidates'];
      else if (lower.includes('report') || lower.includes('governance')) response = mockResponses['governance report'];
      return { success: true, data: { response, timestamp: new Date().toISOString() } };
    }
  },
};

export default aiService;
