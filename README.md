



### How Install
if u r use npm
> npm i nevt  

or yarn  

> yarn add nevt

### How Use

It is recommended to use Typescript

```typescript
import Nevt from 'nevt';

const nevt = new Nevt();

interface IData {
    name: string;
}

enum EAction {
    LOGIN = 'LOGIN',
}

nevt.on(EAction.LOGIN, (data: IData) => {
    console.log(data.name);
});

nevt.emit(EAction.LOGIN, {name: 'msr7'} as IData);

```


### Features

#### support to sub after pub


```typescript
import Nevt from './index';

const nevt = new Nevt();

interface IData {
    name: string;
}

enum EAction {
    LAZY = 'LAZY',
}

// pub 
nevt.emit(EAction.LAZY, {name: 'LAZY'} as IData, { lazy: true });

// sub after pub
nevt.on(EAction.LAZY, (data: IData) => {
    console.log(data.name);
}, { lazy: true });

```

https://www.npmjs.com/package/nevt

*--registry https://registry.npmjs.org/*