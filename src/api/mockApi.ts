interface CardData {
    number: string;
    name: string;
    expiry: string;
    cvc: string;
}

export const submitCardData = (cardData: CardData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (cardData.number && cardData.name && cardData.expiry && cardData.cvc) {
                console.log('Data submitted:', cardData);
                resolve('Data submitted successfully');
            } else {
                reject('All fields are required');
            }
        }, 2000);
    });
};

