import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option
      }
    })
    return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
    const today = dayjs();
    let count = deliveryOption.deliveryDays;
    let deliveryDate = today
    /*const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
    );*/
    /*while (count > 0) {
        if(deliveryDate.day() > 0 && deliveryDate.day() < 6) {
            deliveryDate.add(1, 'days');
            console.log('Count-1')
            count--
        } else {
            deliveryDate.add(1, 'days');
            console.log('Debug')
        }
    }*/
    for (let i=0; i<count; i++) {
        if(deliveryDate.day() === 0) {
            deliveryDate = deliveryDate.add(1, 'days')
            i--;
        } else if (deliveryDate.day() === 6) {
            deliveryDate = deliveryDate.add(1, 'days')
            i--;
        } else {
            deliveryDate = deliveryDate.add(1, 'days')
        }
    }
    const dateString = deliveryDate.format('dddd, MMMM D')
    return dateString
}