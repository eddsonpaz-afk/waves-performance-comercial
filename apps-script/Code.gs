const CONFIG = {
  ABA_LEADS: 'LEADS - DASH',
  LINHA_CABECALHO: 1
};

/**
 * Mantém o Index atual funcionando normalmente.
 * Quando chamado com ?api=leads, entrega JSON para o frontend Vercel.
 */
function doGet(e) {
  if (e && e.parameter && e.parameter.api === 'leads') {
    try {
      return jsonResponse_({ success: true, leads: getLeads() });
    } catch (err) {
      return jsonResponse_({ success: false, message: err.message });
    }
  }

  return HtmlService
    .createTemplateFromFile('Index')
    .evaluate()
    .setTitle('CRM de Leads')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Endpoint para o Vercel gravar na mesma aba LEADS - DASH.
 * Se você criar a propriedade de script API_TOKEN, as escritas passam a exigir esse token.
 */
function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    validateToken_(body.token || '');

    if (body.action === 'updateLead') {
      return jsonResponse_({ success: true, result: updateLead(body.dados || {}) });
    }

    if (body.action === 'novoLead') {
      return jsonResponse_({ success: true, id: novoLead(body.dados || {}) });
    }

    return jsonResponse_({ success: false, message: 'Ação inválida.' });
  } catch (err) {
    return jsonResponse_({ success: false, message: err.message });
  }
}

function validateToken_(received) {
  const expected = PropertiesService.getScriptProperties().getProperty('API_TOKEN') || '';
  if (expected && received !== expected) {
    throw new Error('Token de API inválido.');
  }
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getLeads() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(CONFIG.ABA_LEADS);

  if (!sh) {
    throw new Error('A aba "LEADS - DASH" não foi encontrada.');
  }

  const values = sh.getDataRange().getValues();
  if (values.length <= 1) return [];

  return values.slice(1)
    .filter(row => row[0] !== '')
    .map((row, index) => ({
      row: index + 2,
      id: String(row[0] || ''),
      mes: String(row[1] || ''),
      nome: String(row[2] || ''),
      empresa: String(row[3] || ''),
      ddd: String(row[4] || ''),
      tel: String(row[5] || ''),
      uf: String(row[6] || ''),
      orig: String(row[7] || ''),
      interesse: String(row[8] || ''),
      etapa: String(row[9] || ''),
      resp: String(row[10] || ''),
      status: String(row[11] || ''),
      obs: String(row[12] || ''),
      valor: Number(row[13]) || 0,
      motivo: String(row[14] || '')
    }));
}

function updateLead(dados) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(CONFIG.ABA_LEADS);

  if (!sh) throw new Error('A aba "LEADS - DASH" não foi encontrada.');
  if (!dados || !dados.id) throw new Error('ID do lead não informado.');

  const values = sh.getDataRange().getValues();
  let rowNumber = 0;

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(dados.id)) {
      rowNumber = i + 1;
      break;
    }
  }

  if (!rowNumber) throw new Error('Lead não encontrado: ' + dados.id);

  sh.getRange(rowNumber, 9).setValue(dados.interesse || '');
  sh.getRange(rowNumber, 10).setValue(dados.etapa || '');
  sh.getRange(rowNumber, 12).setValue(dados.status || '');
  sh.getRange(rowNumber, 13).setValue(dados.obs || '');
  sh.getRange(rowNumber, 14).setValue(Number(dados.valor) || 0);
  sh.getRange(rowNumber, 15).setValue(dados.motivo || '');

  SpreadsheetApp.flush();
  return { sucesso: true, id: dados.id, linha: rowNumber };
}

function atualizarLead(dados) {
  return updateLead(dados);
}

function novoLead(dados) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(CONFIG.ABA_LEADS);

  if (!sh) throw new Error('A aba "LEADS - DASH" não foi encontrada.');

  const ultimaLinha = sh.getLastRow();
  const ids = ultimaLinha > 1
    ? sh.getRange(2, 1, ultimaLinha - 1, 1).getValues().flat()
    : [];

  let maior = 0;
  ids.forEach(id => {
    const match = String(id).match(/(\d+)$/);
    if (match) maior = Math.max(maior, Number(match[1]));
  });

  const novoId = 'LEAD-' + String(maior + 1).padStart(4, '0');

  sh.appendRow([
    novoId,
    dados.mes || '',
    dados.nome || '',
    dados.empresa || '',
    dados.ddd || '',
    dados.tel || '',
    dados.uf || '',
    dados.orig || '',
    dados.interesse || '',
    dados.etapa || '🆕 Novo Lead',
    dados.resp || 'AGUARDANDO',
    dados.status || '🟢 Em andamento',
    dados.obs || '',
    Number(dados.valor) || 0,
    dados.motivo || 'AGUARDANDO'
  ]);

  SpreadsheetApp.flush();
  return novoId;
}
