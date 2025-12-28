// backend/app/config/colors.js
// Georgia Tech themed colors with button variants

export default {
  // Core brand colors
  primary: '#B3A369',       // GT Gold
  secondary: '#003057',     // GT Navy Blue
  background: '#FFFFFF',    // White background
  text: '#003057',          // Navy Blue for primary text
  mutedText: '#75787B',     // Neutral Gray for secondary text
  border: '#A2AAAD',        // Light Gray for dividers

  // Semantic status colors
  danger: '#C8102E',        // Red for errors/warnings
  success: '#6BA539',       // Green for success
  info: '#002855',          // Darker blue for highlights
  white: '#FFFFFF',
  black: '#000000',

  // Button-specific colors
  buttonPrimary: {
    background: '#B3A369',  // GT Gold
    text: '#FFFFFF',        // White text
  },
  buttonSecondary: {
    background: '#003057',  // GT Navy Blue
    text: '#FFFFFF',        // White text
  },
  buttonDanger: {
    background: '#C8102E',  // Red
    text: '#FFFFFF',
  },
  buttonSuccess: {
    background: '#6BA539',  // Green
    text: '#FFFFFF',
  },
  buttonDisabled: {
    background: '#A2AAAD',  // Gray
    text: '#FFFFFF',
  },
};
