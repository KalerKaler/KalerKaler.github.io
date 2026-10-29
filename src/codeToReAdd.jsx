<div className={styles.certifications}>
    <div className={styles.certLabels}>
        <div className={styles.dropdown} ref={wrapperRef}>
            <b onClick={() => setSubmenu(o => !o)} className={styles.dropdownSelection}>{certCat}</b>
            <ul className={`${styles.certsSubmenu} ${submenu ? styles.open: ""}`}>
                {certCategories.map(category => (
                    <li onClick={() => handleSelect(category)}>{category}</li>
                ))}
            </ul>
            
        </div>
        <b className={styles.certHeading}>CERTIFICATIONS</b>
    </div>
    <div className={styles.certContainer}>
        {certs.map(cert => (
            (certCat == "ALL" || cert.category == certCat) && <div className={styles.certDiv}><p className={styles.certDivHeader}>{cert.label}</p><img className={styles.certImage} src={cert.src}/></div>
        ))}
    </div>
</div>