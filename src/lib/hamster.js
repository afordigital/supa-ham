export default class Hamster {
    constructor({ id, name, age, avatar, description }) {
        id && (this.id = id);
        name || id
            ? name && (this.name = name)
            : console.log('Te olvidaste de "name" al crear al Hamster');
        avatar && (this.avatar = avatar);
        age
            ? age && (this.age = age)
            : console.log('Te olvidaste de "age" al crear al Hamster');
        description && (this.description = description);
    }
}