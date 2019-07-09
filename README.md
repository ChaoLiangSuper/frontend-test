## Frontend-test

### Install Dependency 
`yarn`

### Run On Local 
`yarn start`

### Run Test
`yarn test`

### Run Coverage
`yarn coverage`

### Build app & docker image
`yarn build`

### App Workflow
![frontend-test](https://user-images.githubusercontent.com/15777593/60911429-7748e100-a2c6-11e9-98e4-d1038c482381.jpg)

### Caching Algorithm
The max size for caching is 8 ahead, so it will be 4 pages behind current page and 4 pages ahead.
Initially, when app starts, it will fetch current page (1) and 4 pages ahead [2, 3, 4, 5]
![frontend-test2](https://user-images.githubusercontent.com/15777593/60911586-de669580-a2c6-11e9-8eb4-62639f9738d9.jpg)

When current page changes, which means user clicked 'next' or 'back', this app will fetch the new page and store it.
![frontend-test3](https://user-images.githubusercontent.com/15777593/60911589-e1fa1c80-a2c6-11e9-9d43-77c17d578cab.jpg)

App uses debounce function to minimize the number of api call. 
If a user changes page too frenquent, app will try to fetch data with latest positon and neighbors around it.
![frontend-test4](https://user-images.githubusercontent.com/15777593/60911716-24bbf480-a2c7-11e9-9d5a-0a60d266f5c2.jpg)

When cache reaches max size, adding new page will trigger a function to remove the oldest page. The oldest page is calculated based on which page is the farthest from the current page.
![frontend-test5](https://user-images.githubusercontent.com/15777593/60911969-aa3fa480-a2c7-11e9-958a-9cdb81056794.jpg)
