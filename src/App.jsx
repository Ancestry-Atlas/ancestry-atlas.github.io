import 'nano-grid/dist/nanogrid.js'
import 'nano-grid/dist/nanogrid_styles.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import EditMembers from './members/Edit'
import EditFamilyNames from './family-names/Edit'
import { ModalProvider } from './contexts/ModalContext'

import Table from './graph/Table'
import Force3D from './graph/Force3D'
import RadialClusterTree from './graph/RadialClusterTree'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <ModalProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/graph/table"
            element={<Table />}
          />
          <Route
            path="/graph/force-3d"
            element={<Force3D />}
          />
          <Route
            path="/graph/radial-cluster-tree"
            element={<RadialClusterTree />}
          />
          <Route
            path="/members/edit/:id"
            element={<EditMembers />}
          />
          <Route
            path="/family-names/edit/:id"
            element={<EditFamilyNames />}
          />
          <Route
            path="/members/create"
            element={<EditMembers />}
          />
          <Route
            path="/family-names/create"
            element={<EditFamilyNames />}
          />
        </Routes>
      </Router>
    </ModalProvider>
  )
}
