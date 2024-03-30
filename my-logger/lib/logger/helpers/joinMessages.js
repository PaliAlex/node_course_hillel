export function joinMessages(messages) {
    const array = [];

    messages.forEach(it => array.push(JSON.stringify(it)));

    return array.join(',');
}