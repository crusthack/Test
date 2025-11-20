# 자료구조 구현 과제

## 
- LinkedList
- Queue(Stack)
- BinaryTree
- HashTable

## Node.js 환경설정

- 1. nodejs.org/en/download 접속, Installer 다운 및 실행
- [ ] node --version
- [ ] npm --version

- 2. 프로젝트 초기화

``` 
npm init -y
```

- 3. 패키지 설치 및 타입스크립트 설정

```
npm install -D typescript jest ts-node ts-jest @types/jest @types/node
npx tsc --init
npx ts-jest config:init 
```

- 4. 설정파일 수정

- package.json, tsconfig.json, jest.config.js 수정
- 웬만하면 그냥 복사붙여넣기 / 깃허브 클론

- 5. 테스트

```
npm run test
```