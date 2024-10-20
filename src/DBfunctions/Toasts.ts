import toast from "react-hot-toast";
export function success(msg: string) {
    toast.success(msg, {
    style: {
      background: '#4CAF50', // Custom green background
      color: 'white',         // Text color
      borderRadius: '8px',    // Rounded corners
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Soft shadow
      padding: '16px',        // Padding for a clean look
    },
    iconTheme: {
      primary: '#ffffff',     // Customize the icon color
      secondary: '#4CAF50',   // Background of the icon
    },
  });
}
export function fail(msg: string) {
    toast.error(msg, {
    style: {
      background: '#F44336', // Custom red background
      color: 'white',        // Text color
      borderRadius: '8px',   // Rounded corners
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Soft shadow
      padding: '16px',       // Padding for a clean look
    },
    iconTheme: {
      primary: '#ffffff',    // Customize the icon color
      secondary: '#F44336',  // Background of the icon
    },
  });
}