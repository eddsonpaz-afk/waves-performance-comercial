# Waves Performance Comercial

Novo frontend do dashboard comercial CBS Importadora / Waves Plus.

## Projeto independente
Este repositório é separado do CRM anterior e não altera o projeto `waves-cbs-crm`.

## Fonte de dados
O frontend usa a mesma aba `LEADS - DASH` da planilha atual. A rota `/api/leads` no Vercel funciona como proxy para o Google Apps Script existente.

Apps Script atual:
`https://script.google.com/macros/s/AKfycbwK94FvHdbWpEipC_4N9Uq6YoV7nxcpuGDByoJofpE-TO-pNJMnUaHCvk6FdDk72rPv_w/exec`

O arquivo `apps-script/Code.gs` mantém o Index antigo no `doGet()` normal e acrescenta:
- `GET ?api=leads` para leitura JSON
- `POST action=updateLead` para edição
- `POST action=novoLead` para novos registros

## Publicação do Apps Script
No projeto Apps Script vinculado à planilha:
1. Substituir o conteúdo do `Code.gs` pelo arquivo `apps-script/Code.gs` deste repositório.
2. Implantar > Gerenciar implantações > editar a implantação atual > Nova versão > Implantar.
3. A URL `/exec` pode permanecer a mesma.

## Segurança opcional
Em Apps Script > Configurações do projeto > Propriedades do script, crie `API_TOKEN`.
No Vercel, crie a variável `CRM_API_TOKEN` com o mesmo valor.

## Desenvolvimento
```bash
npm install
npm run dev
```

## Produção
```bash
npm run build
npm start
```
