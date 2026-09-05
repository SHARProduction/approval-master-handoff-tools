export const evaluators={
  'client-approval-evidence-register': i=>{const rows=(i.decisions||[]).map(x=>({...x,complete:Boolean(x.id&&x.scope&&x.owner&&x.timestamp&&x.evidence&&typeof x.approved==='boolean')}));return{valid:rows.length>0&&rows.every(x=>x.complete),rows,pending:rows.filter(x=>!x.approved).map(x=>x.id)}},
  'final-master-handoff-validator': i=>{const missing=(i.required||[]).filter(x=>!(i.items||[]).includes(x));const gates={checksums:Boolean(i.checksums),approvals:Boolean(i.approvals),receipt:Boolean(i.receipt)};return{valid:(i.required||[]).length>0&&!missing.length&&Object.values(gates).every(Boolean),missing,gates,ready:!missing.length&&Object.values(gates).every(Boolean)}}
};
export function evaluate(slug,input){const fn=evaluators[slug];if(!fn)throw new Error('Unknown tool');return fn(input)}
