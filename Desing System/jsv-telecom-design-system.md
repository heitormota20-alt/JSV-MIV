# JSV Telecom — Design System

> Arquivo de referência do projeto **MIV JSV Telecom**.
> Extraído do PDF de marca enviado pelo cliente. Valores de cor são exatos (fornecidos no material). Tipografia e demais primitives são inferidos do material visual.

---

## Essence

Identidade corporativa de telecom que equilibra **força empresarial** e **proximidade humana**. O sistema é construído sobre um contraste decidido entre o azul institucional profundo (confiança, estabilidade, escala) e o laranja vibrante (energia, calor, conexão humana). Estética limpa, geométrica e tecnológica, com superfícies amplas de cor sólida e uso generoso de espaço negativo. Transmite "moderno o suficiente para competir, humano o suficiente para conectar".

---

## Color Palette

A marca opera sobre três cores fundamentais. O par azul + laranja é o coração do sistema; o branco é a respiração.

### Brand / Primárias

| Token | HEX | RGB | CMYK | Uso |
|-------|-----|-----|------|-----|
| `brand-blue` | `#004AAD` | 0, 74, 173 | 95 / 72 / 0 / 0 | Cor institucional dominante. Fundos sólidos, logo positivo, blocos de seção, tipografia de marca |
| `brand-orange` | `#F4600D` | 244, 96, 13 | 0 / 82 / 88 / 0 | Acento de energia e conexão. Detalhe do símbolo, CTAs, destaques, ícones de app |
| `brand-white` | `#FFFFFF` | 255, 255, 255 | 0 / 0 / 0 / 0 | Fundo claro, logo negativo, texto sobre cor sólida, respiro |

> Observação: o PDF lista o RGB do azul como `0,174,73` mas o HEX `#004AAD` corresponde a `0,74,173`. O HEX é a referência correta (o RGB no material parece ter um erro de digitação). Trabalhar sempre por `#004AAD`.

### Derivadas sugeridas (para UI / slides — inferidas, não no material original)

Para construir interface e apresentação além das 3 cores chapadas, sugiro esta extensão (use com moderação, mantendo o sistema fiel):

| Token | HEX aprox. | Uso |
|-------|-----------|-----|
| `blue-900` | `#003278` | Sombras de profundidade sobre azul, fundos mais densos |
| `blue-700` | `#004AAD` | = brand-blue |
| `blue-500` | `#1565D8` | Hover de elementos azuis, links |
| `orange-600` | `#F4600D` | = brand-orange |
| `orange-400` | `#FF8A3D` | Hover/highlight, gradiente do símbolo |
| `gray-100` | `#F2F4F7` | Superfícies neutras claras, cards sobre branco |
| `gray-500` | `#667085` | Texto secundário sobre fundo claro |
| `ink-900` | `#0B1B2B` | Cenários escuros (fachada, mockups noturnos) |

### Gradiente de marca

O símbolo aparece com um gradiente laranja sutil (claro → saturado), de `#FF8A3D` para `#F4600D`. Usar apenas no símbolo/ícone, nunca em texto.

---

## Typography

### Famílias

- **Display / Headings — `CONTRHAX`** (Fonte 01 oficial da marca)
  Sans geométrica, tecnológica, com terminações retas e largura levemente condensada. Tem caráter "telecom/tech". Usada em títulos, labels, números e palavras-chave. Funciona bem em **uppercase com tracking aberto** (como no lockup "TELECOM" e em "POSITIVO/NEGATIVO").
  → Fallback web: `'Saira', 'Rajdhani', 'Chakra Petch', sans-serif` (geométricas técnicas similares, disponíveis no Google Fonts).

- **Body — sugerida** (não especificada no material)
  Para texto corrido e parágrafos longos do MIV, recomendo uma sans neutra e legível que conviva com a Contrhax sem competir.
  → Sugestão: `'Inter'` ou `'Manrope'`, pesos 400/500/600.

### Tratamentos característicos

- Labels e palavras-chave em **CAIXA ALTA** com **letter-spacing amplo** (ex.: `T E L E C O M`).
- Títulos curtos e diretos, peso alto (600–700).
- Números e dados técnicos na fonte display (caráter de marca).

### Escala sugerida (para o MIV)

| Nível | Tamanho | Peso | Tracking | Uso |
|-------|---------|------|----------|-----|
| Display | 64–96px | 700 | normal | Capa, número de slide |
| H1 | 40–48px | 700 | normal | Título de slide |
| H2 | 28–32px | 600 | normal | Subtítulo |
| Label | 14–16px | 600 | +0.2em, uppercase | Categorias, tags, "OBJETIVO" |
| Body | 18–20px | 400 | normal | Texto corrido |
| Caption | 13–14px | 500 | +0.05em | Legendas, créditos |

---

## Spacing & Layout

### Base
Sistema de **8px** (múltiplos: 8 / 16 / 24 / 32 / 48 / 64 / 96).

### Padrões observados no material
- Composições com **muito espaço negativo** — elemento central isolado, respiro generoso ao redor.
- Blocos de cor **full-bleed** (cor sangra até a borda) — ver slides de aplicação positiva/negativa e paleta tripartida.
- Layout em **terços** para comparações (positivo / negativo; as três cores lado a lado).

### Para o MIV (slide lateral)
- Estrutura recomendada: **sidebar fixa** (índice/navegação) + **palco** do slide.
- Container do conteúdo do slide: margem interna de 64–96px.
- Sidebar: ~280–320px de largura.

---

## Elevation & Depth

### Border radii
- A marca usa **cantos arredondados suaves e consistentes** — o símbolo é construído sobre quadrados de cantos arredondados; o ícone de app usa raio generoso (squircle).
- `radius-sm`: 8px (cards, botões)
- `radius-md`: 16px (containers, painéis)
- `radius-lg`: 24px (ícone de app, blocos hero)

### Sombras
- Material físico (cartão, fachada, mockups) sugere profundidade realista, mas a linguagem de marca em si é **flat**.
- Para UI: sombras sutis e frias.
  - `shadow-sm`: `0 1px 3px rgba(11,27,43,.08)`
  - `shadow-md`: `0 8px 24px rgba(11,27,43,.12)`

---

## Interactive States (sugeridos para o MIV)

### Botões / navegação de slide
- **Default:** fundo `brand-blue`, texto branco
- **Hover:** `blue-500` (clareia) ou borda/realce laranja
- **Active:** `blue-900`
- **Acento primário (CTA):** `brand-orange`, hover `orange-400`

### Indicador de slide ativo (sidebar)
- Item ativo: barra/realce em `brand-orange`, texto branco
- Itens inativos: texto em opacidade reduzida sobre azul

### Transições
- Troca de slide: deslize lateral suave, `cubic-bezier(.4,0,.2,1)`, ~400–500ms.
- Microinterações: rápidas e secas (~150–200ms ease-out).

---

## Motion

### Princípios
Movimento **controlado e corporativo** — nada brincalhão demais. Entradas suaves, transições laterais limpas (coerente com o conceito de "slide lateral"). O laranja pode aparecer como elemento que "energiza" a microinteração (ex.: indicador que acende).

### Padrões para o MIV
- **Transição entre slides:** horizontal slide + fade leve.
- **Entrada de conteúdo:** elementos sobem 8–16px com fade, escalonados (stagger ~60ms).
- **Navegação:** teclado (setas), clique na sidebar, scroll/swipe lateral.

---

## Elementos Gráficos de Marca

- **Símbolo:** monograma "J" estilizado em quadrados sobrepostos de cantos arredondados, com o detalhe laranja no canto superior esquerdo. Funciona isolado (ícone de app, pin, favicon).
- **Chevron / seta dupla `>>`:** elemento de apoio visto na aplicação de mochila — sugere movimento, avanço, "conectar hoje, potencializar amanhã". Pode ser usado como grafismo decorativo de fundo nos slides.
- **Padrão de marca-d'água:** o símbolo aparece em baixo contraste como textura de fundo (ver capa). Útil para preencher áreas amplas de azul.
- **Assinatura:** "CONNECTING TODAY. POWERING TOMORROW."

---

## Design Principles

1. **Contraste decidido azul/laranja** — confiança institucional + calor humano. Nunca diluir esse par.
2. **Cor chapada e espaço negativo** — superfícies sólidas e respiro; evitar poluição visual.
3. **Geometria tecnológica** — cantos arredondados consistentes, tipografia display geométrica.
4. **Clareza acima de decoração** — coerente com a palavra-chave CLAREZA do conceito.
5. **Sistema portátil** — funciona de favicon de app a fachada de prédio mantendo identidade.

---

## Implementation Notes (CSS custom properties)

```css
:root {
  /* Brand */
  --brand-blue:   #004AAD;
  --brand-orange: #F4600D;
  --brand-white:  #FFFFFF;

  /* Extended */
  --blue-900: #003278;
  --blue-500: #1565D8;
  --orange-400: #FF8A3D;
  --gray-100: #F2F4F7;
  --gray-500: #667085;
  --ink-900:  #0B1B2B;

  /* Gradient */
  --grad-orange: linear-gradient(135deg, #FF8A3D 0%, #F4600D 100%);

  /* Type */
  --font-display: 'Saira', 'Rajdhani', sans-serif; /* proxy de Contrhax */
  --font-body: 'Inter', system-ui, sans-serif;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;

  /* Shadow */
  --shadow-sm: 0 1px 3px rgba(11,27,43,.08);
  --shadow-md: 0 8px 24px rgba(11,27,43,.12);

  /* Motion */
  --ease-standard: cubic-bezier(.4,0,.2,1);
  --dur-slide: 450ms;
}
```

### Notas de fonte
- **Contrhax** é fonte comercial (não-Google). Para o MIV em HTML, ou (a) embarcar o arquivo `.woff2` se o cliente fornecer a licença, ou (b) usar `Saira`/`Rajdhani` como proxy fiel via Google Fonts. Definir com o cliente.

---

*Próximo passo do projeto: criar o arquivo de conteúdo dos slides (`.md`) e depois construir o MIV em HTML/CSS com navegação lateral.*
