/**
 * Tugas Praktikum Pertemuan 2 - Personal Student Dashboard
 * Mahasiswa: Ilyas Ramadhan (NIM: 123140016)
 * Fitur ES6+: let/const, Class, Arrow Functions, Template Literals, Destructuring, Spread Operator, Async/Await.
 */

// 1. ES6 Class untuk Memodelkan Item Tugas
class TaskItem {
  constructor({ id = Date.now().toString(), title, course, priority, deadline, completed = false }) {
    this.id = id;
    this.title = title;
    this.course = course;
    this.priority = priority;
    this.deadline = deadline;
    this.completed = completed;
  }
}

// 2. ES6 Class Utama untuk Mengelola Aplikasi Dashboard
class DashboardApp {
  constructor() {
    this.STORAGE_KEY = 'itera_dashboard_tasks';
    this.tasks = [];
    this.currentFilter = 'all';

    // Inisialisasi Elemen DOM
    this.form = document.getElementById('task-form');
    this.idInput = document.getElementById('task-id');
    this.titleInput = document.getElementById('task-title');
    this.courseInput = document.getElementById('task-course');
    this.priorityInput = document.getElementById('task-priority');
    this.deadlineInput = document.getElementById('task-deadline');
    this.btnSubmit = document.getElementById('btn-submit');
    this.btnCancel = document.getElementById('btn-cancel');
    this.formHeading = document.getElementById('form-heading');

    this.taskListContainer = document.getElementById('task-list-container');
    this.taskStats = document.getElementById('task-stats');
    this.filterButtons = document.querySelectorAll('.filter-btn');

    this.weatherContainer = document.getElementById('weather-content');
    this.quoteContainer = document.getElementById('quote-content');
    this.btnRefreshQuote = document.getElementById('btn-refresh-quote');

    this.clockDisplay = document.getElementById('clock-display');
    this.dateDisplay = document.getElementById('date-display');
  }

  // Method Inisialisasi
  init = () => {
    this.loadTasks();
    this.renderTasks();
    this.registerEvents();
    this.startClock();
    
    // Operasi Asinkron ES6+ (Async/Await)
    this.fetchCampusWeather();
    this.fetchDailyQuote();
  };

  // Event Listeners (Menggunakan Arrow Functions)
  registerEvents = () => {
    this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    this.btnCancel.addEventListener('click', () => this.resetForm());
    this.btnRefreshQuote.addEventListener('click', () => this.fetchDailyQuote());

    this.filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter;
        this.renderTasks();
      });
    });
  };

  // Real-time Clock Widget
  startClock = () => {
    const updateTime = () => {
      const now = new Date();
      this.clockDisplay.textContent = now.toLocaleTimeString('id-ID');
      this.dateDisplay.textContent = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };
    updateTime();
    setInterval(updateTime, 1000);
  };

  // Operasi Asinkron 1: Cuaca Kampus ITERA (Open-Meteo API)
  fetchCampusWeather = async () => {
    const lat = -5.36;
    const lon = 105.31;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Gagal mengambil data cuaca');
      const data = await response.json();
      
      // Destructuring parameter objek cuaca
      const { temperature, windspeed, weathercode } = data.current_weather;

      this.weatherContainer.innerHTML = `
        <div class="weather-temp">${temperature}°C</div>
        <div class="weather-detail">
          <p><strong>Lokasi:</strong> Kampus ITERA, Lampung Selatan</p>
          <p><strong>Kondisi:</strong> ${this.getWeatherDescription(weathercode)}</p>
          <p><strong>Kecepatan Angin:</strong> ${windspeed} km/h</p>
        </div>
      `;
    } catch (error) {
      this.weatherContainer.innerHTML = `<p style="color: var(--danger);">Gagal memuat cuaca: ${error.message}</p>`;
    }
  };

  // Helper Deskripsi Cuaca WMO
  getWeatherDescription = (code) => {
    if (code === 0) return 'Cerah';
    if (code <= 3) return 'Cerah Berawan';
    if (code <= 48) return 'Berkabut';
    if (code <= 65) return 'Hujan Ringan - Sedang';
    if (code <= 99) return 'Hujan Disertai Petir';
    return 'Berawan';
  };

  // Operasi Asinkron 2: Kutipan Motivasi (DummyJSON API)
  fetchDailyQuote = async () => {
    this.quoteContainer.innerHTML = `<div class="spinner"></div><p>Memuat kutipan...</p>`;
    try {
      const res = await fetch('https://dummyjson.com/quotes/random');
      if (!res.ok) throw new Error('Gagal mengambil kutipan');
      
      // Destructuring quote & author
      const { quote, author } = await res.json();

      this.quoteContainer.innerHTML = `
        <blockquote>"${quote}"</blockquote>
        <cite>— ${author}</cite>
      `;
    } catch (error) {
      this.quoteContainer.innerHTML = `<p style="color: var(--danger);">Gagal memuat kutipan inspirasi.</p>`;
    }
  };

  // Operasi LocalStorage: Muat Data
  loadTasks = () => {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      this.tasks = parsed.map((item) => new TaskItem(item));
    } else {
      // Data inisialisasi awal
      this.tasks = [
        new TaskItem({
          title: 'Praktikum Pemrograman Web Pertemuan 2',
          course: 'Pemrograman Web',
          priority: 'Tinggi',
          deadline: '2026-10-24',
          completed: false
        })
      ];
      this.saveTasks();
    }
  };

  // Operasi LocalStorage: Simpan Data
  saveTasks = () => {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
  };

  // Form Submit Handler (Tambah atau Edit)
  handleFormSubmit = (event) => {
    event.preventDefault();

    const id = this.idInput.value;
    const title = this.titleInput.value.trim();
    const course = this.courseInput.value.trim();
    const priority = this.priorityInput.value;
    const deadline = this.deadlineInput.value;

    if (!title || !course || !deadline) return;

    if (id) {
      // Operasi Edit Data menggunakan Map & Spread Operator
      this.tasks = this.tasks.map((task) =>
        task.id === id ? new TaskItem({ ...task, title, course, priority, deadline }) : task
      );
    } else {
      // Operasi Tambah Baru menggunakan Spread Operator
      const newTask = new TaskItem({ title, course, priority, deadline });
      this.tasks = [newTask, ...this.tasks];
    }

    this.saveTasks();
    this.renderTasks();
    this.resetForm();
  };

  // Edit Mode Switcher
  editTask = (id) => {
    const target = this.tasks.find((task) => task.id === id);
    if (!target) return;

    // Destructuring atribut task
    const { title, course, priority, deadline } = target;

    this.idInput.value = id;
    this.titleInput.value = title;
    this.courseInput.value = course;
    this.priorityInput.value = priority;
    this.deadlineInput.value = deadline;

    this.formHeading.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Tugas`;
    this.btnSubmit.textContent = 'Perbarui Tugas';
    this.btnCancel.style.display = 'inline-block';
    this.titleInput.focus();
  };

  // Toggle Status Selesai
  toggleTask = (id) => {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? new TaskItem({ ...task, completed: !task.completed }) : task
    );
    this.saveTasks();
    this.renderTasks();
  };

  // Hapus Item Tugas
  deleteTask = (id) => {
    if (confirm('Yakin ingin menghapus tugas ini?')) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.saveTasks();
      this.renderTasks();
    }
  };

  // Reset Form Input
  resetForm = () => {
    this.form.reset();
    this.idInput.value = '';
    this.formHeading.innerHTML = `<i class="fa-solid fa-plus-circle"></i> Tambah Tugas Kuliah`;
    this.btnSubmit.textContent = 'Simpan Tugas';
    this.btnCancel.style.display = 'none';
  };

  // Render Tampilan List Tugas
  renderTasks = () => {
    // Filter tugas berdasarkan tab aktif
    const filteredTasks = this.tasks.filter((task) => {
      if (this.currentFilter === 'pending') return !task.completed;
      if (this.currentFilter === 'completed') return task.completed;
      return true;
    });

    // Perhitungan Statistik
    const totalCount = this.tasks.length;
    const completedCount = this.tasks.filter((t) => t.completed).length;
    this.taskStats.textContent = `${totalCount} Total Tugas (${completedCount} Selesai)`;

    if (filteredTasks.length === 0) {
      this.taskListContainer.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-clipboard-check" style="font-size: 2.5rem; margin-bottom: 8px;"></i>
          <p>Tidak ada tugas dalam kategori ini.</p>
        </div>
      `;
      return;
    }

    // Rendering List menggunakan Template Literals
    this.taskListContainer.innerHTML = filteredTasks
      .map(
        ({ id, title, course, priority, deadline, completed }) => `
        <div class="task-item ${completed ? 'completed' : ''}" data-id="${id}">
          <div class="task-left">
            <input type="checkbox" class="task-checkbox" ${completed ? 'checked' : ''} onchange="app.toggleTask('${id}')">
            <div class="task-info">
              <div class="task-title">${title}</div>
              <div class="task-meta">
                <span><i class="fa-solid fa-book"></i> ${course}</span>
                <span>•</span>
                <span><i class="fa-regular fa-calendar"></i> ${deadline}</span>
                <span class="priority-tag priority-${priority}">${priority}</span>
              </div>
            </div>
          </div>
          <div class="task-actions">
            <button class="btn-action edit" onclick="app.editTask('${id}')" title="Edit Tugas">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="btn-action delete" onclick="app.deleteTask('${id}')" title="Hapus Tugas">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `
      )
      .join('');
  };
}

// Inisialisasi Aplikasi Saat DOM Selesai Dimuat
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new DashboardApp();
  app.init();
});