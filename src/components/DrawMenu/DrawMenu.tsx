'use client';

import styles from './style.module.css';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import DrawMenuItem from '../DrawMenuItem/DrawMenuItem';
import { Timers } from '@/helpers/types';


function padStart(num: number){
    return '0'.repeat(2 - num.toString().length) + num;
}




export default function DrawMenu() {
    const router = useRouter();

    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const addButtonRef = useRef(null);

    const [timersList, setTimersList] = useState([]);
    const [hidden, setHidden] = useState(true);



    useEffect(() => {
        window.onclick = (evt) => {
            if (evt.x > 420 && !hidden) {
                console.log(evt.x);
                setHidden(old => !old);
            }
        };
        
    }, [hidden]);

    useEffect(() => {
        if (menuRef.current == null || buttonRef.current == null || addButtonRef.current == null) return;

        const div = menuRef.current as HTMLDivElement;
        const itemDivs = Array.from(div.children);
        const button = buttonRef.current as HTMLButtonElement;
        const addButton = addButtonRef.current as HTMLAnchorElement;

        if (!hidden) {
            div.style.width = '400px';
            itemDivs.forEach(item => item.classList.remove(styles.hidden));
            button.style.left = '175px';
            addButton.style.left = '175px';
        } else {
            div.style.width = '0px';
            itemDivs.forEach(item => item.classList.add(styles.hidden));
            button.style.left = '30px';
            addButton.style.left = '-40px';
        }

        const interval = setInterval(() => {
            const timers = localStorage.getItem('timers') || '[]';
            setTimersList(JSON.parse(timers));
        }, 100);

        return () => {
            clearInterval(interval);
        }
    }, [hidden]);


    const timers_elements = timersList.map((timer: Timers, idx: number) => <DrawMenuItem key={idx} timer={timer} style={styles.hidden} />);


    function handleDrawButton() {
        setHidden(old => !old);
    }

    return (
        <div className={styles.drawMenuWrapper}>
            <button ref={buttonRef} className={styles.drawMenuButton} onClick={handleDrawButton}>
                <div></div>
                <div></div>
                <div></div>
            </button>
            <div ref={menuRef} className={styles.drawMenu}>
                {timers_elements.length == 0 ? <p className={styles.noItems}>No timers yet...</p> : timers_elements}
            </div>
            <Link href="/" ref={addButtonRef} className={styles.newButton}>
                <div className={styles.line1}></div>
                <div className={styles.line2}></div>
                <div className={styles.line3}></div>
            </Link>
        </div>
    );
}