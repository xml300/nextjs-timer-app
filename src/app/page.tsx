import AddTimer from '@/components/AddTimer/AddTimer';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <AddTimer />
    </main>
  )
}
