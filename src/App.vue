<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">Consultorio Pediátrico</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to="/doctors" class="nav-link">Doctores</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/patients" class="nav-link">Pacientes</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/appointments" class="nav-link">Citas</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/consultations" class="nav-link">Consultas</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container mt-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
