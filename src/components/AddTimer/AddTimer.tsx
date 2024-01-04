'use client';

import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import styles from './style.module.css';

import { padStart } from '@/helpers/functions';

export default function AddTimer() {
    const router = useRouter();


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

        const id = (timers_list.at(-1)) ? timers_list.at(-1).id + 1 : 1;

        const timer = {
            id: id,
            endTime: time(hours, mins, secs)
        }

        timers_list.push(timer);

        localStorage.setItem('timers', JSON.stringify(timers_list));
        router.push('/timers/'+id);
    }

    function handleFocus(evt: FormEvent){
        const input = evt.target as HTMLInputElement;

        if(input.value == '') input.value = '00';

        setTimeout(() => input.selectionStart = input.selectionEnd + input.value.length, 0);
    }

    return (
        <div className={styles.main}>
            <form action="" className={styles.form} onSubmit={handleSubmit}>
                <h2>Add Timer</h2>
                <br />
                <br />
                <div className={styles.row}>
                    <input type="text" 
                    name="hours" 
                    placeholder={'00'} 
                    min={0} 
                    onInput={(evt) => handleInputChange(evt, 99)} 
                    onFocus={handleFocus} /> 

                    <span>:</span>

                    <input type="text" 
                    name="mins" 
                    placeholder={'00'} 
                    min={0} 
                    max={59} 
                    onInput={(evt) => handleInputChange(evt, 59)} 
                    onFocus={handleFocus} /> 

                    <span>:</span>

                    <input 
                    type="text" 
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