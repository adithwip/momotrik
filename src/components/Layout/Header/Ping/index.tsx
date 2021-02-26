import styles from './Ping.module.css'

const Ping = () => {
  return (
    <div className="flex justify-center items-end mr-4">
      <p className={styles.pingText}>
        Updating...
      </p>
      <span className="flex h-3 w-3 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-400"></span>
      </span>
    </div>
  )
}

export default Ping