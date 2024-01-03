import Timer from "@/components/TImer/Timer";
import styles from './page.module.css';

export default function TimerPage({params}: {params: {id: string}}){
    const id = parseInt(params.id);

    return (
        <main className={styles.main}>
            <Timer id={id} />
        </main>
    );
}