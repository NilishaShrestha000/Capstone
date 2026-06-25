const SideMenu = ({ isOpen, onClose, isAdmin }) => {
    return (
        <div className={`fixed top-0 left-0 h-full w-64 bg-white transform transition-transform duration-300
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <button onClick={onClose}>Close</button>
            <NavLinks closeMenu={onClose} isMobile={true} isAdmin={isAdmin} />
        </div>
    );
}