# Plugin Stream Deck para DaVinci Resolve

Este plugin permite controlar o DaVinci Resolve usando o Stream Deck Plus no macOS.

## 🎯 Funcionalidades

### Botões (Keypad):
1. **Cut Clip** - Corta o clipe na posição atual (`Command + B`)
2. **Magnetic Toggle** - Alterna modo magnético on/off (`N`)
3. **Edit Point Type** - Altera tipo de ponto de edição (`U`)
4. **Split Clip** - Divide o clipe na posição atual (`Command + \`)
5. **Clip Navigation** - Navega entre início/final do clipe (`;` e `'`)

### Dials (Encoder):
6. **Zoom Control** - Zoom in/out (`Command +` / `Command -`)
7. **Scroll Control** - Scroll horizontal na timeline
8. **Track Size Control** - Ajusta altura das tracks

## 🔧 Configuração

### Pré-requisitos:
- macOS (testado no macOS Ventura/Sonoma)
- Stream Deck Plus
- DaVinci Resolve Studio
- Node.js 20+

### Instalação:
1. Clone o repositório
2. Execute: `npm install`
3. Execute: `npm run watch`
4. O plugin aparecerá automaticamente no Stream Deck

### ⚠️ Configuração de Permissões:

**IMPORTANTE**: Para que os comandos de teclado funcionem, você precisa dar permissão de acessibilidade ao Stream Deck:

1. Abra **Configurações do Sistema** > **Privacidade e Segurança**
2. Clique em **Acessibilidade**
3. Adicione o **Stream Deck** à lista de apps autorizados
4. Certifique-se de que está marcado

### 🎛️ Configuração dos Atalhos no DaVinci:

Alguns atalhos podem precisar ser configurados no DaVinci Resolve:

1. Abra **DaVinci Resolve** > **Preferences** > **User** > **Keyboard Customization**
2. Configure os seguintes atalhos se necessário:
   - **Magnetic Toggle**: `N`
   - **Edit Point Type**: `U`
   - **Clip Navigation**: `;` e `'`

## 🚀 Como Usar

1. Abra o app Stream Deck
2. Arraste as ações da categoria "davinci" para seus botões/dials
3. Abra o DaVinci Resolve
4. Use os botões/dials para controlar o DaVinci!

## 🔍 Resolução de Problemas

### Os comandos não funcionam:
1. Verifique se as permissões de acessibilidade estão configuradas
2. Certifique-se de que o DaVinci Resolve está em primeiro plano
3. Verifique se os atalhos estão corretos no DaVinci

### Plugin não aparece no Stream Deck:
1. Execute `npm run watch` no terminal
2. Reinicie o app Stream Deck
3. Verifique se não há erros no terminal

### Erros de compilação:
1. Certifique-se de que tem Node.js 20+
2. Execute `npm install` novamente
3. Execute `npm run build` para verificar erros

## 🛠️ Desenvolvimento

### Estrutura do Código:
```
src/
├── actions/          # Ações do Stream Deck
├── utils/           # Utilitários (keyboard.ts)
└── plugin.ts        # Arquivo principal
```

### Comandos:
- `npm run build` - Compila o plugin
- `npm run watch` - Modo desenvolvimento (auto-reload)

### Adicionando Novas Ações:
1. Crie um novo arquivo em `src/actions/`
2. Registre a ação em `src/plugin.ts`
3. Adicione ao manifest em `com.caio.davinci.sdPlugin/manifest.json`

## 📝 Notas

- **macOS only**: Este plugin usa AppleScript e só funciona no macOS
- **DaVinci Focus**: O DaVinci Resolve precisa estar em primeiro plano
- **Permissões**: Sem as permissões corretas, os comandos não funcionarão

## 🐛 Reportar Bugs

Se encontrar problemas, verifique:
1. Logs do terminal onde está rodando `npm run watch`
2. Console do Stream Deck
3. Permissões do sistema

## 🎉 Pronto para Usar!

Agora você pode acelerar seu workflow de edição no DaVinci Resolve com o Stream Deck Plus! 