'use client';

import styles from './style.module.css';

import { Timers } from '@/helpers/types';
import { padStart } from '@/helpers/functions';

import { useRouter } from 'next/navigation';


export default function DrawMenuItem({ timer, style }: { timer: Timers, style: string}) {
    const router = useRouter();

    const h = Math.floor(timer.endTime / 3600);
    const m = Math.floor((timer.endTime - h * 3600) / 60);
    const s = timer.endTime - h * 3600 - m * 60;

    function handleCloseButton() {
        const timers = JSON.parse(localStorage.getItem('timers') || '[]');
        const new_timers = timers.filter(el => el.id !== timer.id);

        localStorage.setItem('timers', JSON.stringify(new_timers));
    }
        
    return (
        <div className={styles.wrapper + ' ' + style}>
            <div className={styles.drawMenuItem} key={timer.id} onClick={() => router.push(`/timers/${timer.id}`)}>
                <h2>Timer {timer.id}</h2>
                <p>{padStart(h.toString())}:{padStart(m.toString())}:{padStart(s.toString())}</p>
            </div>
            <button className={styles.closeButton} onClick={handleCloseButton}>
                <div className={styles.line1}></div>
                <div className={styles.line2}></div>
            </button>
        </div>
    );
}