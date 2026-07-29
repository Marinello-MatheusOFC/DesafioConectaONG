import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import ContentPage from './pages/ContentPage';
const routes = [
  ['/', 'index'], ['/sobre','sobre'], ['/adocao','adocao'], ['/brecho','brecho'],
  ['/eventos','eventos'], ['/como-ajudar','como-ajudar'], ['/noticias','noticias'],
  ['/galeria','galeria'], ['/contato','contato']
];
function ScrollAndTitle(){ const {pathname}=useLocation(); useEffect(()=>window.scrollTo({top:0,behavior:'instant'}),[pathname]); return null; }
export default function App(){ return <><ScrollAndTitle/><Routes>{routes.map(([path,page])=><Route key={path} path={path} element={<Layout><ContentPage page={page}/></Layout>}/>) }<Route path="*" element={<Layout><ContentPage page="index"/></Layout>}/></Routes></>; }
