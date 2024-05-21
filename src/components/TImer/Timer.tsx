'use client';
import { useEffect, useState } from 'react';
import styles from './style.module.css';

import { Timers } from '@/helpers/types';

function padStart(n: number, length: number) {
    const num = n.toString();
    let index = 0;

    for (let i = 0; i < num.length; i++) {
        if (num.at(i) == '0') {
            continue;
        }

        index = i;
        break;
    }

    return '0'.repeat(length - Math.min(length, num.length - index)) + num.slice(index);
}

export default function Timer({ id }: { id: number }) {
    const timers = localStorage.getItem('timers') || '[]';
    const timers_list = JSON.parse(timers);
    const timer = timers_list.filter((el: Timers) => el.id == id)[0];

    const [seconds, setSeconds] = useState(timer.endTime);
    const [pause, setPause] = useState(true);

    useEffect(() => {
        console.log(seconds);
        const interval = setTimeout(() => {
            if (pause || seconds < 0) {
                return;
            }
            setSeconds((sec: number) => {
                const index = timers_list.findIndex((el: { id: number }) => el.id == id);
                timer.endTime = sec - 1;
                timers_list[index] = timer;
                localStorage.setItem('timers', JSON.stringify(timers_list));

                return Math.max(0,sec - 1);
            });
        }, 1000);

        return () => {
            clearTimeout(interval);
        }
    }, [pause,seconds, timer, timers_list, id]);

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds - h * 3600) / 60);
    const s = seconds - h * 3600 - m * 60;

    return (
        <main className={styles.main}>
            <div className={styles.pageContent}>
                <p className={styles.pageContentP}>{padStart(h, 2)}:{padStart(m, 2)}:{padStart(s, 2)}</p>
                <div>
                    <button className={styles.buttonStart} onClick={() => setPause(false)}>Start</button>
                    <button className={styles.buttonStop} onClick={() => setPause(true)}>Stop</button>
                </div>
            </div>
        </main>
    );
}