
import { useDarkMode } from '@stateManagment'

export const theme = ()=>{
  const darMode = useDarkMode();


  return  { 
    fonts: {
      "sans": "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
      "serif": "ui-serif,Georgia,Cambria,Times New Roman,Times,serif",
      "mono": "ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
      "body": "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
      "heading": "inherit",
      "monospace": "ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace"
    },
    "fontSizes": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "default": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
      "8xl": "6rem",
      "9xl": "8rem"
    },
    "fontWeights": {
      "hairline": 100,
      "thin": 200,
      "light": 300,
      "normal": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700,
      "extrabold": 800,
      "black": 900,
      "body": 400,
      "heading": 700
    },
    colors: {
      primary:darMode?"#111827":"#fff",
      secondary: "#0ca69e",
      text:darMode?"#fff":"#0c2a41",
      textHover:"#111827",
      input: "#F9FAFB",
      button: '#3B82F6',
      buttonHover: "#10ddd2",
      navHover: darMode?"#0ca69e":"#0ca69e",
      navIconHover: darMode?"#111827":"#fff",
      iconHover: darMode?"#0ca69e":"#0ca69e",
      background: darMode?"#111827":"#fff",
      "transparent": "transparent",
      "black": "#000",
      "white": "#fff",
      
    },
    buttons: {
      primary: {
        color: 'text',
        bg: 'button',
        '&:hover': {
          bg: 'buttonHover',
        }
      },
      secondary: {
        color: 'text',
        bg: 'secondary',
      },
      iconButton:{
        width:'8',
        height:'12'
      },
      navIconButton:{
        width:'8',
        height:'12',
        xl:'hidden',
        display:'gird',
      }
    },
    forms: {
      label: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily:'monospace',
        color:'text'
      },
      input: {
        borderColor: 'secondary',
        '&:focus': {
          borderColor: 'primary',
          boxShadow: t => `0 0 0 2px ${t.colors.primary}`,
          outline: 'none',
        },
      },
      select: {
        borderColor: 'secondary',
        '&:focus': {
          borderColor: 'primary',
          boxShadow: t => `0 0 0 2px ${t.colors.primary}`,
          outline: 'none',
        },
      },
      textarea: {
        borderColor: 'secondary',
        '&:focus': {
          borderColor: 'primary',
          boxShadow: t => `0 0 0 2px ${t.colors.primary}`,
          outline: 'none',
        },
      },
      slider: {
        bg: 'secondary',
      },
      redSlider: {
        color: 'red',
      },
    },
    text: {
      default: {
        color: 'text',
        fontSize: 12,
      },
      caps: {
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
      },
      heading: {
        fontFamily: 'heading',
        fontWeight: 'heading',
        lineHeight: 'heading',
        display:'flex',
        justifyContent: 'center',
      },
    },
    links: {
      nav: {
        display:'flex',
        justifyContent: 'center',
        flexDirection:"row",
        fontFamily:"sans",
        fontSize: 'lg',
        color:'text',
        '&:hover': {
          color:'text',
          background:'textHover'
        },
      },
  
    },
    borderRadius: {
      md: '0.375rem',
    },
    boxShadow: {
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      nav:t => `33px 9px 43px -27px ${t.colors.text}`
    },
    "letterSpacings": {
      "tighter": "-0.05em",
      "tight": "-0.025em",
      "normal": "0em",
      "wide": "0.025em",
      "wider": "0.05em",
      "widest": "0.1em"
    },
    "lineHeights": {
      "3": ".75rem",
      "4": "1rem",
      "5": "1.25rem",
      "6": "1.5rem",
      "7": "1.75rem",
      "8": "2rem",
      "9": "2.25rem",
      "10": "2.5rem",
      "none": "1",
      "tight": "1.25",
      "snug": "1.375",
      "normal": "1.5",
      "relaxed": "1.625",
      "loose": "2",
      "body": "1.625",
      "heading": "1.25"
    },
    "sizes": {
      "0": "0",
      "1": "0.25rem",
      "2": "0.5rem",
      "3": "0.75rem",
      "4": "1rem",
      "5": "1.25rem",
      "6": "1.5rem",
      "8": "2rem",
      "10": "2.5rem",
      "12": "3rem",
      "16": "4rem",
      "20": "5rem",
      "24": "6rem",
      "32": "8rem",
      "40": "10rem",
      "48": "12rem",
      "56": "14rem",
      "64": "16rem",
      "px": "1px",
      "xs": "20rem",
      "sm": "24rem",
      "md": "28rem",
      "lg": "32rem",
      "xl": "36rem",
      "2xl": "42rem",
      "3xl": "48rem",
      "4xl": "56rem",
      "5xl": "64rem",
      "6xl": "72rem",
      "7xl": "80rem",
      "prose": "65ch",
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      "1/6": "16.666667%",
      "2/6": "33.333333%",
      "3/6": "50%",
      "4/6": "66.666667%",
      "5/6": "83.333333%",
      "1/12": "8.333333%",
      "2/12": "16.666667%",
      "3/12": "25%",
      "4/12": "33.333333%",
      "5/12": "41.666667%",
      "6/12": "50%",
      "7/12": "58.333333%",
      "8/12": "66.666667%",
      "9/12": "75%",
      "10/12": "83.333333%",
      "11/12": "91.666667%",
      "full": "100%",
      "screenHeight": "100vh",
      "screenWidth": "100vw"
    },
    "shadows": {
      "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      "default": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)"
    },
    "space": [
      "0",
      "0.25rem",
      "0.5rem",
      "1rem",
      "2rem",
      "4rem",
      "8rem",
      "16rem",
      "32rem"
    ],
    "radii": {
      "none": "0px",
      "sm": "0.125rem",
      "default": "0.25rem",
      "md": "0.375rem",
      "lg": "0.5rem",
      "xl": "0.75rem",
      "2xl": "1rem",
      "3xl": "1.5rem",
      "full": "9999px"
    },
    "zIndices": {
      "0": 0,
      "10": 10,
      "20": 20,
      "30": 30,
      "40": 40,
      "50": 50,
      "auto": "auto"
    },
    styles: {
      nav: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        px: 4,
        py: 2,
      },
    },
  
  };
}




