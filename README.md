# 📝 Todo App with React & Zustand

## 📌 프로젝트 소개

React, TypeScript, Zustand를 활용한 할 일 관리 애플리케이션입니다.  
할 일을 추가하고, 카테고리별로 관리하며, 드래그 앤 드롭으로 정렬할 수 있습니다.  
아직 개발중입니다...

## 📂 프로젝트 폴더 구조

📂 src  
├── 📂 components  
│ ├── 📄 TodoList.tsx # 카테고리별 구분 컴포넌트  
│ ├── 📄 TodoForm.tsx # 할 일 입력 컴포넌트  
│ ├── 📄 TodoItem.tsx # 할 일 목록 렌더링  
│ ├── 📄 Todo.tsx # 모든 컴포넌트 통합  
├── 📂 stores  
│ ├── 📄 useTodoStore.ts # Zustand 상태 관리  
├── 📄 App.tsx # 메인 애플리케이션

## 🚀 프로젝트 실행 방법

npm install  
npm start  
브라우저에서 http://localhost:3000 접속

## 🔧 주요 기능

✅ 할 일 추가 및 삭제  
✅ "To Do", "Doing", "Done" 카테고리 구분  
✅ 드래그 앤 드롭 정렬 (dnd-kit 사용)  
✅ Zustand로 전역 상태 관리  
✅ TypeScript 적용

## 📦 기술 스택

React 18  
TypeScript  
Zustand  
dnd-kit  
Vite
