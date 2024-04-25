import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { submitCardData } from '../api/mockApi';
import styles from './CardForm.module.css';

const CardForm = () => {
    const dispatch = useDispatch();
    const card = useSelector((state: RootState) => state.card);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({ type: `set${name.charAt(0).toUpperCase() + name.slice(1)}`, payload: value }); // обновляем значение в Redux

        // Валидация каждого поля
        if (name === 'number' && !validateCardNumber(value)) {
            setErrors(prevErrors => ({ ...prevErrors, number: 'Неправильный номер карты' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, number: '' }));
        }

        if (name === 'expiry' && !validateExpiry(value)) {
            setErrors(prevErrors => ({ ...prevErrors, expiry: 'Неверная дата' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, expiry: '' }));
        }

        if (name === 'cvc' && !validateCVC(value)) {
            setErrors(prevErrors => ({ ...prevErrors, cvc: 'Неправильный CVC' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, cvc: '' }));
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Проверка наличия ошибок валидации перед отправкой данных
        if (Object.values(errors).some(error => error)) {
            alert('Пожалуйста, исправьте ошибки в форме');
            return;
        }

        try {
            const result = await submitCardData(card);
            alert(result);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <input onChange={handleChange} type="text" name="number" placeholder="Номер карты" className={styles.inputField} />
            {errors.number && <span className={styles.error}>{errors.number}</span>}

            <input onChange={handleChange} type="text" name="expiry" placeholder="MM / ГГ" className={styles.inputField} />
            {errors.expiry && <span className={styles.error}>{errors.expiry}</span>}

            <input onChange={handleChange} type="text" name="cvc" placeholder="CVC/CVVC" className={styles.inputField} />
            {errors.cvc && <span className={styles.error}>{errors.cvc}</span>}

            <button type="submit" className={styles.button}>Оплатить</button>
        </form>
    );
};

export default CardForm;

// Функции валидации
const validateCardNumber = (value: string) => {
    return /^\d{16}$/.test(value);
};

const validateExpiry = (value: string) => {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(value);
};

const validateCVC = (value: string) => {
    return /^\d{3,4}$/.test(value);
};

