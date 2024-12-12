export function companyFormatter(companyObj) {
  return `${companyObj.name}`;
}

export function addressFormatter(addressDataObj) {
  return `${addressDataObj.street} ${addressDataObj.suite} - ${addressDataObj.zipcode} (${addressDataObj.city})`;
}

export function randomBirthday() {
  const currentYear = new Date().getFullYear();

  const startRange = currentYear - 80;
  const endRange = currentYear - 20;

  const randomYear =
    Math.floor(Math.random() * (endRange - startRange + 1)) + startRange;

  const randonMonth = Math.floor(Math.random() * 12);
  const randomDaY = Math.floor(Math.random() * 28) + 1;

  const birthday = new Date(randomYear, randonMonth, randomDaY);

  const day = birthday.getDate().toString().padStart(2, "0");
  const month = (birthday.getMonth() + 1).toString().padStart(2, "0");
  const year = birthday.getFullYear();

  return `${day}/${month}/${year}`;
}

export function usersMapped(data) {
  return data?.map((user) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    address: addressFormatter(user.address),
    phone: user.phone,
    website: user.website,
    company: companyFormatter(user.company),
    birthday: randomBirthday(),
  }));
}

export const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export function dateFormatter(date) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

export function checkBirthdayCondition(date) {
  const currentDate = new Date();
  const minDate = new Date("1920-01-01");

  const selected = new Date(date);

  if (selected > currentDate) {
    return "Birthday cannot be greater than current date.";
  }
  if (selected < minDate) {
    return "Birthday cannot be prior to 1920";
  }
}

export const validateEmail = (email) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = pattern.test(email);
  if (!isValid) return `Invalid email`;
};

const validationRules = {
  name: {
    required: true,
    validator: (value) => (!value ? "Name is required." : ""),
  },
  username: {
    required: true,
    validator: (value) => (!value ? "Username is required." : ""),
  },
  email: {
    required: false,
    validator: (value) => {
      if (value) {
        const invalidMail = validateEmail(value);
        return invalidMail || "";
      }
      return "";
    },
  },
  birthday: {
    required: false,
    validator: (value) => {
      if (value) {
        const invalidDate = checkBirthdayCondition(value);
        return invalidDate || "";
      }
      return "";
    },
  },
};

export const validateInput = (field, value) => {
  const rule = validationRules[field];
  if (!rule) return "";

  const error = rule.validator(value);
  return error;
};
