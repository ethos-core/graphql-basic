import { useReactiveVar } from '@apollo/client/react';
import { useEffect } from 'react';
import { darkModeVar } from '../state/ui';

export function ThemeToggle() {
    const isDark = useReactiveVar(darkModeVar);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <button className="btn-theme" onClick={() => darkModeVar(!isDark)}>
            {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
}
