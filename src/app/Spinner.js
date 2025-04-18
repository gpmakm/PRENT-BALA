export default function Spinner() {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <div style={{
          width: "30px",
          height: "30px",
          border: "4px solid #f3f3f3",
          borderTop: "4px solid #3498db",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }} />
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }
  