// GamesPage.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import DefaultPageLayout from '../DefaultPageLayout';

function GamesPage() {
  return (
    <DefaultPageLayout>
      <Outlet />
    </DefaultPageLayout>
  );
}

export default GamesPage;
