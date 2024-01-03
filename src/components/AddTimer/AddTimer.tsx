'use client';

import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import styles from './style.module.css';

export default function AddTimer() {
    const router = useRouter();

    function padStart(num: string, length: number) {
        console.log(num, length);
        let index = 0;

        for (let i = 0; i < num.length; i++) {
            if (num.at(i) == '0' && i < num.length - 1) {
                continue;
            }

            index = i;
            break;
        }

        console.log(index);

        return '0'.repeat(length - Math.min(length, num.length - index)) + num.slice(index);
    }

    function handleInputChange(evt: FormEvent, constraint: number) {
        const input = evt.target as HTMLInputElement;


        if (input.value == '') {
            input.value = '0';
        }

        if (Number(input.value) > constraint) {
            input.value = input.value.slice(0, 2);
        }

        input.value = padStart(input.value, 2);
    }

    function time(hours: number, mins: number, secs: number) {
        return hours * 3600 + mins * 60 + secs;
    }

    function handleSubmit(evt: FormEvent) {
        evt.preventDefault();
        
        const formData = new FormData(evt.target as HTMLFormElement);
        const timers = localStorage.getItem('timers') || '[]';
        const timers_list = JSON.parse(timers);

        const hours = parseInt(formData.get('hours') as string || '0');
        const mins = parseInt(formData.get('mins') as string || '0');
        const secs = parseInt(formData.get('secs') as string || '0');

        const timer = {
            id: timers_list.length + 1,
            endTime: time(hours, mins, secs)
        }

        timers_list.push(timer);

        localStorage.setItem('timers', JSON.stringify(timers_list));
        router.push('/timers/'+timers_list.length);
    }

    function handleFocus(evt: FormEvent){
        const input = evt.target as HTMLInputElement;
        if(input.value == '') input.value = '00';
    }

    return (
        <div className={styles.main}>
            <form action="" className={styles.form} onSubmit={handleSubmit}>
                <h2>Add Timer</h2>
                <br />
                <br />
                <div className={styles.row}>
                    <input type="number" 
                    name="hours" 
                    placeholder={'00'} 
                    min={0} 
                    onInput={(evt) => handleInputChange(evt, 99)} 
                    onFocus={handleFocus} /> 

                    <span>:</span>

                    <input type="number" 
                    name="mins" 
                    placeholder={'00'} 
                    min={0} 
                    max={59} 
                    onInput={(evt) => handleInputChange(evt, 59)} 
                    onFocus={handleFocus} /> 

                    <span>:</span>

                    <input 
                    type="number" 
                    name="secs" 
                    placeholder={'00'} 
                    min={0} max={59} 
                    onInput={(evt) => handleInputChange(evt, 59)} 
                    onFocus={handleFocus} />
                    
                </div>
                <br />
                <button className={styles.formButton}>Start Timer</button>
            </form>
        </div>
    )
}