# Gamble Fighterz Server

## API Documentation

### Description

This api allows you to use GET and POST methods to read and submit highscores to Gamble Fighterz!

#### *[LIVE APP](https://gamble-fighterz.vercel.app/)*

#### *[FRONTEND REPO](https://github.com/JakelTheDeveloper/gamble-fighterz-app)*

#### Version

-1.0.0

## Servers

### HighScore Server

#### URL: 

```
                    https://cryptic-meadow-19457.herokuapp.com/api/scores
```

#### DESCRIPTION:

 

``` 
                    method: 'GET' 
```

```
                    fetch(`${config.URL}/api/scores`, {headers: {
                        'authorization': `Bearer ${config.API_KEY}`,
                    }})

                    expect(200)
```


#### DESCRIPTION: 



``` 
                    method: 'POST'
```

``` 
                    method: 'POST',
                    body: JSON.stringify({
                        username: username,
                        score:score
                    }),
                    headers: { 'Content-Type': 'application/json',
                    'authorization': `Bearer ${config.API_KEY}` }

                    expect(201)
```      