export const theme = {
  fontFamily: 'sans-serif',
  fontSize: '13px',
  navbarBgColor: '#3a134c',
  // Responsive Breakpoint
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 700,
    lg: 1024,
    xl: 1200,
  },
  // Container
  container: {
    maxWidth: 1280,
    padding: {
      xs: '0 15px',
      md: '0 50px',
    },
  },
  // Button
  btnHeight: 40,
  btn: {
    primary: '#4c1e64',
    danger: '#FF3333',
    warning: '#FF9900',
    success: '#33AA33',
    default: '#333333',
  },
  btnHover: {
    primary: '#3b0d54',
    danger: '#EE2222',
    warning: '#EE8800',
    success: '#229922',
    default: '#222222',
  },
  // Text
  text: {
    primary: '#4c1e64',
    danger: '#e02b27',
    warning: '#FF9900',
    success: '#33AA33',
    default: '#333333',
  },
  inputStyle: () => '',
};
