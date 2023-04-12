import styles from './PageHeader.module.scss';

const PageHeader = ({title}) => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{title}</h1>
        </div>
    );
};

export default PageHeader;