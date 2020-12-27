# Read Me

> This read.me file intends to explain the main fundamentals and approaches I undertook during the development of this project.

---

### Table of Contents

- [Description ](#description)
- [Technologies and Dependencies](#technologies-and-dependencies)
- [License](#license)
- [Author Info](#author-info)

---

## Description

Fully functional version of Budget World Node.js. Travelling app with the purpose of allowing users to budget their holidays and share information about activities, general transportation cost and other popular items.

### Capabilities

- Log in and Log out (Authentication)
- Add, Update and Remove for ONLY users items
- Data Base Management
- Multiple dimension filtering
- css responsive
- Fully Hosted

## Technologies and Dependencies

- React.js (Class Components)
- CSS
- React-routing
- React Redux
- Axios (http request handling)
- Firebase (server)

Some of the practice opporunities and new learnings:

- react class cycles. ComponentDidMounth();
- Redux and reducer manipulation
- forms and inputs handling (Double binding)
- Proping across components

[Back To The Top](#read-me)

### Highlight coding learning - Fetch items from server

Fetching information and using token authentication for limiting users accessibility

```
export const fetchItemsFromServer = (token) => {
	return (dispatch) => {
		dispatch(fetchItemsStart());
		axios
			.get('/items.json?auth=' + token)
			.then((res) => {
				const fetchedItems = [];
				for (let item in res.data) {
					fetchedItems.push({
						...res.data[item],
						id: item,
					});
				}
				dispatch(fetchItemsSuccess(fetchedItems));
			})
			.catch((error) => {
				dispatch(fetchItemsFail(error));
			});
	};
};
```

---

## License

MIT License

Copyright (c) [2020] [Carlos Suarez]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PUxwPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[Back To The Top](#read-me)

---

## Author Info

- LinkedIn - [Link](https://www.linkedin.com/in/carlos-suarez-msc-a3659141/)
- Website - [my-portfolioweb](https://my-portfolioweb-ba888.web.app/)

[Back To The Top](#read-me)
