export const Footer = () => {
  return (
    <div>
      <footer className="py-4 mt-8 text-center text-white bg-gray-800">
        <div>
          <p>© {new Date().getFullYear()} Movie Browser, Inc.</p>
          <p>All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};
