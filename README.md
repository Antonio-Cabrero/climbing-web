<!-- Prerequisites -->
### :bangbang: Prerequisites

This project uses Yarn as package manager

```bash
 npm install --global yarn
```
Note: While installing new dependecies, it is necessary to use "yarn add -D" if its a dev dependency or just "yarn add" if its not. Do not use npm install, this will create a new package-lock.json which will interfere with the yarn.lock.

<!-- Run Locally -->
### :arrow_forward: Run Locally
```bash
  git clone https://github.com/jossi87/climbing-web.git
  cd climbing-web
  yarn
  yarn dev
```
*Change origin in api.ts to build different products in development.*

<!-- Deployment -->
### :triangular_flag_on_post: Deployment
To deploy this project run
```bash
  yarn build
```
Check if code is ES6 compliant
```bash
  yarn es6-check
```

<!-- License -->
## :warning: License
Distributed under the GNU GENERAL PUBLIC LICENSE (Version 3): https://brattelinjer.no/gpl-3.0.txt

<!-- Product -->
## :link: Product
* Bouldering: [buldreinfo.com](https://buldreinfo.com)
* Route climbing: [brattelinjer.no](https://brattelinjer.no)
* Ice climbing: [is.brattelinjer.no](https://is.brattelinjer.no)

<!-- Contact -->
## :handshake: Contact
* Jostein Oeygarden (jostein.oygarden@gmail.com)
* Project Link: [https://github.com/jossi87/climbing-web](https://github.com/jossi87/climbing-web)