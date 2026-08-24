'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  LayoutDashboard, Columns3, Users, ListFilter, RefreshCw, Plus,
  Search, X, Save, Phone, Building2, MapPin, Target, TrendingUp,
  DollarSign, BadgeCheck, AlertTriangle, Sparkles, ChevronRight,
  UserRound, Map, Megaphone, CircleDollarSign, WalletCards,
  SlidersHorizontal, ArrowUpRight, CheckCircle2
} from 'lucide-react';

const STAGES = [
  '🆕 Novo Lead',
  '📞 Em Atendimento',
  '📚 Catálogo / Apresentação',
  '💰 Cotação',
  '🤝 Negociação',
  '🔥 Fechamento',
  '✅ Ganho',
  '❌ Perdido'
];

const STATUSES = [
  '🟢 Em andamento',
  '📵 Não atendeu',
  '🔕 Sem retorno',
  '⏳ Aguardando cliente',
  '👤 Aguardando consultor',
  '✅ Concluído'
];

const LOSS_REASONS = [
  'AGUARDANDO', '💰 Preço', '🚚 Frete/Prazo', '📦 Falta de estoque',
  '💳 Condição de pagamento', '🏪 Comprou da concorrência',
  '❌ Desistiu da compra', '🔕 Sem retorno', '⏳ Prazo de entrega',
  '📝 Cadastro/Condição comercial', '❓ Outro'
];

const money = (n) => Number(n || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const compact = (n) => new Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 1 }).format(Number(n || 0));
const clean = (v) => String(v || '').trim();
const initials = (name='') => clean(name).split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase() || 'WP';

async function apiGet() {
  const response = await fetch('/api/leads', { cache: 'no-store' });
  const data = await response.json();
  if (!response.ok || data.success === false) throw new Error(data.message || 'Não foi possível carregar os leads.');
  return Array.isArray(data.leads) ? data.leads : [];
}

async function apiPost(action, dados) {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, dados })
  });
  const data = await response.json();
  if (!response.ok || data.success === false) throw new Error(data.message || 'Não foi possível salvar.');
  return data;
}

function uniq(data, field) {
  return [...new Set(data.map(x => clean(x[field])).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'pt-BR'));
}

function groupCount(data, field) {
  const map = new Map();
  data.forEach(x => {
    const key = clean(x[field]) || 'Não informado';
    map.set(key, (map.get(key) || 0) + 1);
  });
  return [...map.entries()].sort((a,b)=>b[1]-a[1]);
}

function groupPerformance(data) {
  const map = new Map();
  data.forEach(x => {
    const key = clean(x.resp) || 'AGUARDANDO';
    if (!map.has(key)) map.set(key, { resp:key, total:0, ganhos:0, perdidos:0, valor:0, pipeline:0 });
    const row = map.get(key);
    row.total += 1;
    row.valor += Number(x.valor || 0);
    if (x.etapa === '✅ Ganho') row.ganhos += 1;
    if (x.etapa === '❌ Perdido') row.perdidos += 1;
    if (['💰 Cotação','🤝 Negociação','🔥 Fechamento'].includes(x.etapa)) row.pipeline += Number(x.valor || 0);
  });
  return [...map.values()].sort((a,b)=>b.valor-a.valor || b.total-a.total);
}

function badgeTone(text='') {
  if (text.includes('Ganho') || text.includes('Concluído')) return 'green';
  if (text.includes('Perdido') || text.includes('Sem retorno')) return 'red';
  if (text.includes('Cotação') || text.includes('Aguardando')) return 'yellow';
  if (text.includes('Negociação') || text.includes('Fechamento')) return 'pink';
  if (text.includes('Atendimento') || text.includes('Catálogo')) return 'cyan';
  return 'blue';
}

export default function Home() {
  const [view, setView] = useState('overview');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatedAt, setUpdatedAt] = useState(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [edit, setEdit] = useState(null);
  const [newLeadOpen, setNewLeadOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [filters, setFilters] = useState({ mes:'Todos', resp:'Todos', uf:'Todos', orig:'Todos', etapa:'Todos', status:'Todos' });

  const notify = (message) => { setToast(message); setTimeout(()=>setToast(''), 2600); };

  async function load() {
    setLoading(true); setError('');
    try {
      const leads = await apiGet();
      setData(leads);
      setUpdatedAt(new Date());
    } catch (err) {
      setError(err.message || 'Erro ao carregar dados.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => data.filter(x => {
    const matchFilter = (field, value) => value === 'Todos' || clean(x[field]) === value;
    const text = [x.id,x.nome,x.empresa,x.ddd,x.tel,x.uf,x.orig,x.interesse,x.etapa,x.resp,x.status,x.obs,x.motivo].join(' ').toLowerCase();
    return matchFilter('mes',filters.mes)
      && matchFilter('resp',filters.resp)
      && matchFilter('uf',filters.uf)
      && matchFilter('orig',filters.orig)
      && matchFilter('etapa',filters.etapa)
      && matchFilter('status',filters.status)
      && (!query || text.includes(query.toLowerCase()));
  }), [data, filters, query]);

  const stats = useMemo(() => {
    const ganhos = filtered.filter(x=>x.etapa==='✅ Ganho');
    const perdidos = filtered.filter(x=>x.etapa==='❌ Perdido');
    const val = filtered.reduce((s,x)=>s+Number(x.valor||0),0);
    const gainValue = ganhos.reduce((s,x)=>s+Number(x.valor||0),0);
    const pipeline = filtered.filter(x=>['💰 Cotação','🤝 Negociação','🔥 Fechamento'].includes(x.etapa));
    const pipelineValue = pipeline.reduce((s,x)=>s+Number(x.valor||0),0);
    const conv = filtered.length ? ganhos.length / filtered.length * 100 : 0;
    return {
      total: filtered.length,
      atendimento: filtered.filter(x=>x.etapa==='📞 Em Atendimento').length,
      cotacao: filtered.filter(x=>x.etapa==='💰 Cotação').length,
      negociacao: filtered.filter(x=>x.etapa==='🤝 Negociação').length,
      fechamento: filtered.filter(x=>x.etapa==='🔥 Fechamento').length,
      ganhos: ganhos.length,
      perdidos: perdidos.length,
      valor: val,
      gainValue,
      pipelineValue,
      conv
    };
  }, [filtered]);

  const stageRows = useMemo(() => STAGES.map(stage => ({ stage, count:filtered.filter(x=>x.etapa===stage).length, value:filtered.filter(x=>x.etapa===stage).reduce((s,x)=>s+Number(x.valor||0),0) })), [filtered]);
  const performance = useMemo(() => groupPerformance(filtered), [filtered]);
  const origins = useMemo(() => groupCount(filtered,'orig'), [filtered]);
  const losses = useMemo(() => groupCount(filtered.filter(x=>x.etapa==='❌ Perdido'),'motivo'), [filtered]);
  const actionCounts = useMemo(() => ({
    no: filtered.filter(x=>x.status==='📵 Não atendeu').length,
    sem: filtered.filter(x=>x.status==='🔕 Sem retorno').length,
    resp: filtered.filter(x=>x.status==='👤 Aguardando consultor').length,
    cli: filtered.filter(x=>x.status==='⏳ Aguardando cliente').length
  }), [filtered]);

  function resetFilters() {
    setFilters({ mes:'Todos', resp:'Todos', uf:'Todos', orig:'Todos', etapa:'Todos', status:'Todos' });
    setQuery('');
  }

  function openLead(lead) {
    setSelected(lead);
    setEdit({ ...lead });
  }

  async function saveEdit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await apiPost('updateLead', {
        id: edit.id,
        etapa: edit.etapa,
        status: edit.status,
        interesse: edit.interesse,
        valor: Number(edit.valor || 0),
        motivo: edit.motivo,
        obs: edit.obs
      });
      setData(rows => rows.map(x=>x.id===edit.id ? { ...x, ...edit, valor:Number(edit.valor||0) } : x));
      notify('Lead atualizado na planilha.');
      setSelected(null); setEdit(null);
    } catch (err) {
      notify(err.message || 'Não foi possível salvar.');
    } finally { setSaving(false); }
  }

  async function createLead(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const dados = Object.fromEntries(form.entries());
    if (!clean(dados.nome)) return notify('Informe o nome do lead.');
    setSaving(true);
    try {
      await apiPost('novoLead', { ...dados, valor:Number(dados.valor||0) });
      notify('Novo lead incluído na planilha.');
      setNewLeadOpen(false);
      await load();
    } catch (err) {
      notify(err.message || 'Não foi possível criar o lead.');
    } finally { setSaving(false); }
  }

  return (
    <main className="app-bg">
      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand">
            <div className="brand-mark">W+</div>
            <div><strong>Waves Plus</strong><span>Commercial Intelligence</span></div>
          </div>
          <nav>
            <Nav icon={LayoutDashboard} label="Visão Geral" active={view==='overview'} onClick={()=>setView('overview')} />
            <Nav icon={Columns3} label="Kanban" active={view==='kanban'} onClick={()=>setView('kanban')} />
            <Nav icon={Users} label="Vendedores" active={view==='sellers'} onClick={()=>setView('sellers')} />
            <Nav icon={ListFilter} label="Leads" active={view==='leads'} onClick={()=>setView('leads')} />
          </nav>
          <div className="sidebar-foot">
            <div className="mini-avatar">CBS</div>
            <div><strong>CBS + Waves</strong><span>Performance Comercial</span></div>
          </div>
        </aside>

        <section className="content">
          <header className="topbar">
            <div>
              <span className="eyebrow">PERFORMANCE COMERCIAL</span>
              <h1>{view==='overview'?'Dashboard Comercial':view==='kanban'?'Kanban de Leads':view==='sellers'?'Performance por Responsável':'Base de Leads'}</h1>
              <p>LEADS - DASH • CBS Importadora / Waves Plus</p>
            </div>
            <div className="top-actions">
              <div className="live-pill"><i /> {updatedAt ? `Atualizado ${updatedAt.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}` : 'Aguardando dados'}</div>
              <button className="icon-btn" onClick={load} title="Atualizar dados"><RefreshCw className={loading?'spin':''}/></button>
              <button className="primary-btn" onClick={()=>setNewLeadOpen(true)}><Plus/> Novo lead</button>
            </div>
          </header>

          <section className="filterbar">
            <Filter label="Mês" value={filters.mes} onChange={v=>setFilters(f=>({...f,mes:v}))} options={uniq(data,'mes')} />
            <Filter label="Consultor" value={filters.resp} onChange={v=>setFilters(f=>({...f,resp:v}))} options={uniq(data,'resp')} />
            <Filter label="UF" value={filters.uf} onChange={v=>setFilters(f=>({...f,uf:v}))} options={uniq(data,'uf')} />
            <Filter label="Origem" value={filters.orig} onChange={v=>setFilters(f=>({...f,orig:v}))} options={uniq(data,'orig')} />
            <Filter label="Etapa" value={filters.etapa} onChange={v=>setFilters(f=>({...f,etapa:v}))} options={STAGES} />
            <Filter label="Status" value={filters.status} onChange={v=>setFilters(f=>({...f,status:v}))} options={STATUSES} />
            <button className="reset-btn" onClick={resetFilters}><SlidersHorizontal/> Limpar</button>
          </section>

          {error && <div className="api-warning"><AlertTriangle/><div><strong>Integração aguardando API do Apps Script</strong><span>{error}</span></div><button onClick={load}>Tentar novamente</button></div>}

          {view === 'overview' && (
            <>
              <section className="kpi-grid">
                <Kpi icon={Users} label="Total de Leads" value={stats.total} sub="base filtrada" tone="cyan" />
                <Kpi icon={Phone} label="Em Atendimento" value={stats.atendimento} sub="oportunidades ativas" tone="blue" />
                <Kpi icon={CircleDollarSign} label="Em Cotação" value={stats.cotacao} sub="propostas em curso" tone="violet" />
                <Kpi icon={TrendingUp} label="Negociação" value={stats.negociacao} sub="fase decisiva" tone="pink" />
                <Kpi icon={BadgeCheck} label="Ganhos" value={stats.ganhos} sub={`${stats.conv.toFixed(1)}% conversão`} tone="green" />
                <Kpi icon={DollarSign} label="Valor Gerado" value={compact(stats.valor)} sub={money(stats.valor)} tone="gold" />
              </section>

              <section className="hero-grid">
                <article className="glass-card chart-card">
                  <div className="card-head"><div><span className="eyebrow">PIPELINE</span><h2>Funil de vendas</h2></div><span>{stats.total} leads</span></div>
                  <FunnelChart rows={stageRows} />
                </article>
                <article className="glass-card insight-card">
                  <div className="insight-icon"><Sparkles/></div>
                  <span className="eyebrow">LEITURA EXECUTIVA</span>
                  <h2>{stats.pipelineValue > 0 ? money(stats.pipelineValue) : `${stats.cotacao + stats.negociacao + stats.fechamento} oportunidades`}</h2>
                  <p>{stats.pipelineValue > 0 ? 'em pipeline aberto entre cotação, negociação e fechamento.' : 'estão nas etapas comerciais mais próximas de fechamento.'}</p>
                  <div className="insight-meter"><span style={{width:`${Math.min(100, Math.max(7, stats.conv))}%`}} /></div>
                  <div className="insight-meta"><span>Conversão</span><strong>{stats.conv.toFixed(1)}%</strong></div>
                </article>
              </section>

              <section className="triple-grid">
                <RankCard title="Resultado por responsável" items={performance.slice(0,5).map(x=>({name:x.resp,value:x.total,sub:`${x.ganhos} ganhos • ${money(x.valor)}`}))} />
                <RankCard title="Origem dos leads" items={origins.slice(0,6).map(([name,value])=>({name,value,sub:`${stats.total?((value/stats.total)*100).toFixed(0):0}% da base`}))} />
                <article className="glass-card action-card">
                  <div className="card-head"><div><span className="eyebrow">PRIORIDADES</span><h2>Ações imediatas</h2></div></div>
                  <div className="action-grid">
                    <Action tone="gold" value={actionCounts.no} label="Não atendeu" />
                    <Action tone="red" value={actionCounts.sem} label="Sem retorno" />
                    <Action tone="violet" value={actionCounts.resp} label="Aguard. consultor" />
                    <Action tone="cyan" value={actionCounts.cli} label="Aguard. cliente" />
                  </div>
                </article>
              </section>

              <section className="double-grid">
                <article className="glass-card sales-card">
                  <div className="card-head"><div><span className="eyebrow">VENDAS</span><h2>Acompanhamento comercial</h2></div></div>
                  <div className="sales-summary">
                    <MiniStat label="Pipeline aberto" value={money(stats.pipelineValue)} />
                    <MiniStat label="Valor ganho" value={money(stats.gainValue)} />
                    <MiniStat label="Ticket ganho" value={money(stats.ganhos ? stats.gainValue/stats.ganhos : 0)} />
                  </div>
                  <div className="stage-table">
                    {stageRows.filter(x=>['💰 Cotação','🤝 Negociação','🔥 Fechamento','✅ Ganho','❌ Perdido'].includes(x.stage)).map(row=><div key={row.stage}><span>{row.stage}</span><b>{row.count}</b><strong>{money(row.value)}</strong></div>)}
                  </div>
                </article>
                <article className="glass-card losses-card">
                  <div className="card-head"><div><span className="eyebrow">PERDAS</span><h2>Motivos de perda</h2></div></div>
                  {losses.length ? <Bars items={losses.slice(0,6)} /> : <Empty text="Ainda não há perdas no filtro atual." />}
                </article>
              </section>
            </>
          )}

          {view === 'kanban' && <Kanban data={filtered} onOpen={openLead} />}

          {view === 'sellers' && (
            <section className="seller-grid">
              {performance.map((p,i)=><article className="glass-card seller-card" key={p.resp}>
                <div className="seller-top"><div className="seller-avatar">{initials(p.resp)}</div><div><span className="rank-number">#{i+1}</span><h3>{p.resp}</h3></div></div>
                <div className="seller-main"><strong>{p.total}</strong><span>leads atribuídos</span></div>
                <div className="seller-metrics"><MiniStat label="Ganhos" value={p.ganhos}/><MiniStat label="Valor" value={money(p.valor)}/><MiniStat label="Pipeline" value={money(p.pipeline)}/><MiniStat label="Conversão" value={`${p.total?(p.ganhos/p.total*100).toFixed(1):'0.0'}%`}/></div>
              </article>)}
              {!performance.length && <Empty text="Nenhum responsável no filtro atual." />}
            </section>
          )}

          {view === 'leads' && (
            <section className="glass-card leads-card">
              <div className="leads-tools"><div><span className="eyebrow">BASE FILTRADA</span><h2>{filtered.length} leads</h2></div><label className="search"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar lead, empresa, telefone..."/></label></div>
              <div className="table-wrap"><table><thead><tr><th>Lead</th><th>Empresa</th><th>UF</th><th>Origem</th><th>Interesse</th><th>Etapa</th><th>Responsável</th><th>Valor</th><th></th></tr></thead><tbody>
                {filtered.map(lead=><tr key={lead.id} onClick={()=>openLead(lead)}><td><div className="lead-cell"><div className="lead-avatar">{initials(lead.nome)}</div><div><strong>{lead.nome || 'Sem nome'}</strong><span>{lead.id} • ({lead.ddd}) {lead.tel}</span></div></div></td><td>{lead.empresa || '—'}</td><td>{lead.uf || '—'}</td><td>{lead.orig || '—'}</td><td>{lead.interesse || '—'}</td><td><StatusBadge text={lead.etapa}/></td><td>{lead.resp || 'AGUARDANDO'}</td><td>{money(lead.valor)}</td><td><ChevronRight/></td></tr>)}
                {!filtered.length && <tr><td colSpan="9"><Empty text="Nenhum lead encontrado." /></td></tr>}
              </tbody></table></div>
            </section>
          )}
        </section>
      </div>

      {selected && edit && <LeadModal lead={selected} edit={edit} setEdit={setEdit} onClose={()=>{setSelected(null);setEdit(null)}} onSave={saveEdit} saving={saving} />}
      {newLeadOpen && <NewLeadModal onClose={()=>setNewLeadOpen(false)} onSubmit={createLead} saving={saving} data={data} />}
      {toast && <div className="toast"><CheckCircle2/>{toast}</div>}
    </main>
  );
}

function Nav({icon:Icon,label,active,onClick}) { return <button className={active?'nav active':'nav'} onClick={onClick}><span><Icon/></span>{label}</button>; }
function Filter({label,value,onChange,options}) { return <label className="filter"><span>{label}</span><select value={value} onChange={e=>onChange(e.target.value)}><option>Todos</option>{options.map(o=><option key={o}>{o}</option>)}</select></label>; }
function Kpi({icon:Icon,label,value,sub,tone}) { return <article className={`glass-card kpi ${tone}`}><div className="kpi-icon"><Icon/></div><span>{label}</span><strong>{value}</strong><small>{sub}</small></article>; }
function MiniStat({label,value}) { return <div className="mini-stat"><span>{label}</span><strong>{value}</strong></div>; }
function Action({tone,value,label}) { return <div className={`action ${tone}`}><strong>{value}</strong><span>{label}</span></div>; }
function StatusBadge({text}) { return <span className={`status ${badgeTone(text)}`}>{text || '—'}</span>; }
function Empty({text}) { return <div className="empty"><Target/><span>{text}</span></div>; }

function FunnelChart({rows}) {
  const max = Math.max(1,...rows.map(x=>x.count));
  return <div className="funnel-chart">{rows.map((row,i)=>{
    const w = 100 - i*5.5;
    return <div className="funnel-line" key={row.stage}><span className="stage-name">{row.stage}</span><div className="stage-track"><i style={{width:`${Math.max(3,row.count/max*100)}%`}}/></div><b>{row.count}</b><em>{money(row.value)}</em></div>;
  })}</div>;
}

function RankCard({title,items}) {
  const max = Math.max(1,...items.map(x=>x.value));
  return <article className="glass-card rank-card"><div className="card-head"><div><span className="eyebrow">RANKING</span><h2>{title}</h2></div></div><div className="rank-list">{items.map((item,i)=><div className="rank-row" key={item.name}><span className="pos">{i+1}</span><div className="rank-info"><strong>{item.name}</strong><small>{item.sub}</small><div className="rank-track"><i style={{width:`${Math.max(5,item.value/max*100)}%`}}/></div></div><b>{item.value}</b></div>)}</div></article>;
}

function Bars({items}) {
  const max = Math.max(1,...items.map(x=>x[1]));
  return <div className="bars">{items.map(([name,value])=><div className="bar-item" key={name}><div><span>{name}</span><b>{value}</b></div><div className="bar-track"><i style={{width:`${value/max*100}%`}}/></div></div>)}</div>;
}

function Kanban({data,onOpen}) {
  return <section className="kanban-wrap"><div className="kanban-board">{STAGES.map(stage=>{
    const leads = data.filter(x=>x.etapa===stage);
    return <div className="kanban-col" key={stage}><div className="kanban-head"><strong>{stage}</strong><span>{leads.length}</span></div><div className="kanban-list">{leads.map(lead=><button className="kanban-card" key={lead.id} onClick={()=>onOpen(lead)}><div className="kanban-id">{lead.id}</div><h3>{lead.nome || 'Sem nome'}</h3><p>{lead.empresa || 'Sem empresa'}</p><div className="kanban-meta"><span><MapPin/>{lead.uf||'—'}</span><span><WalletCards/>{money(lead.valor)}</span></div><StatusBadge text={lead.status}/></button>)}{!leads.length && <div className="kanban-empty">Sem leads</div>}</div></div>;
  })}</div></section>;
}

function LeadModal({lead,edit,setEdit,onClose,onSave,saving}) {
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className="modal">
    <div className="modal-head"><div><span className="eyebrow">{lead.id}</span><h2>{lead.nome}</h2><p>{lead.empresa || 'Sem empresa'} • ({lead.ddd}) {lead.tel}</p></div><button className="icon-btn" onClick={onClose}><X/></button></div>
    <div className="detail-grid"><Info icon={Building2} label="Empresa" value={lead.empresa||'—'}/><Info icon={Phone} label="Telefone" value={`(${lead.ddd}) ${lead.tel}`}/><Info icon={MapPin} label="UF" value={lead.uf||'—'}/><Info icon={Megaphone} label="Origem" value={lead.orig||'—'}/><Info icon={UserRound} label="Responsável" value={lead.resp||'AGUARDANDO'}/><Info icon={Map} label="Mês" value={lead.mes||'—'}/></div>
    <form onSubmit={onSave} className="edit-form"><div className="form-grid"><Field label="Etapa"><select value={edit.etapa||''} onChange={e=>setEdit(v=>({...v,etapa:e.target.value}))}>{STAGES.map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Status"><select value={edit.status||''} onChange={e=>setEdit(v=>({...v,status:e.target.value}))}>{STATUSES.map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Interesse"><input value={edit.interesse||''} onChange={e=>setEdit(v=>({...v,interesse:e.target.value}))}/></Field><Field label="Valor"><input type="number" min="0" step="0.01" value={edit.valor||0} onChange={e=>setEdit(v=>({...v,valor:e.target.value}))}/></Field><Field label="Motivo de perda"><select value={edit.motivo||'AGUARDANDO'} onChange={e=>setEdit(v=>({...v,motivo:e.target.value}))}>{LOSS_REASONS.map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Observação" wide><textarea rows="3" value={edit.obs||''} onChange={e=>setEdit(v=>({...v,obs:e.target.value}))}/></Field></div><div className="modal-actions"><button type="button" className="secondary-btn" onClick={onClose}>Cancelar</button><button className="primary-btn" disabled={saving}><Save/>{saving?'Salvando...':'Salvar alterações'}</button></div></form>
  </div></div>;
}

function NewLeadModal({onClose,onSubmit,saving,data}) {
  const currentMonth = new Date().toLocaleString('pt-BR',{month:'long'}).toUpperCase();
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className="modal new-modal"><div className="modal-head"><div><span className="eyebrow">NOVO REGISTRO</span><h2>Novo lead</h2><p>O registro será incluído diretamente na aba LEADS - DASH.</p></div><button className="icon-btn" onClick={onClose}><X/></button></div><form onSubmit={onSubmit}><div className="form-grid"><Field label="Mês"><input name="mes" defaultValue={currentMonth}/></Field><Field label="Nome"><input name="nome" required/></Field><Field label="Empresa"><input name="empresa"/></Field><Field label="DDD"><input name="ddd"/></Field><Field label="Telefone"><input name="tel"/></Field><Field label="UF"><input name="uf"/></Field><Field label="Origem"><input name="orig" list="origens"/><datalist id="origens">{uniq(data,'orig').map(v=><option key={v} value={v}/>)}</datalist></Field><Field label="Interesse"><input name="interesse"/></Field><Field label="Etapa"><select name="etapa" defaultValue="🆕 Novo Lead">{STAGES.map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Responsável"><input name="resp" list="responsaveis" defaultValue="AGUARDANDO"/><datalist id="responsaveis">{uniq(data,'resp').map(v=><option key={v} value={v}/>)}</datalist></Field><Field label="Status"><select name="status" defaultValue="🟢 Em andamento">{STATUSES.map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Valor"><input name="valor" type="number" min="0" step="0.01" defaultValue="0"/></Field><Field label="Motivo"><select name="motivo" defaultValue="AGUARDANDO">{LOSS_REASONS.map(v=><option key={v}>{v}</option>)}</select></Field><Field label="Observação" wide><textarea name="obs" rows="3"/></Field></div><div className="modal-actions"><button type="button" className="secondary-btn" onClick={onClose}>Cancelar</button><button className="primary-btn" disabled={saving}><Plus/>{saving?'Incluindo...':'Criar lead'}</button></div></form></div></div>;
}

function Field({label,wide,children}) { return <label className={wide?'field wide':'field'}><span>{label}</span>{children}</label>; }
function Info({icon:Icon,label,value}) { return <div className="info"><Icon/><div><span>{label}</span><strong>{value}</strong></div></div>; }
