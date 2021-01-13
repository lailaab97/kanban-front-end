import HomePage from './pages/home.vue';
import AboutPage from './pages/about.vue';
import FormPage from './pages/form.vue';
import DynamicRoutePage from './pages/dynamic-route.vue';
import NotFoundPage from './pages/not-found.vue';
import DeveloperPage from './pages/developers.vue';
import TasksPage from './pages/tasks.vue';
import TaskPage from './pages/task.vue';
import AddTaskPage from './pages/addTask.vue';
import PanelLeftPage from './pages/panel-left.vue';
import PanelRightPage from './pages/panel-right.vue';

export default [
  {
    path: '/',
    component: HomePage,
  },
  
  {
    path: '/developers/',
    component: DeveloperPage,
  },
  {
    path: '/tasks/',
    component: TasksPage,
  },
  {
    path: '/addTask/',
    component: AddTaskPage,
  },
  {
    path: '/tasks/:id/',
    component: TaskPage,
  },
  {
    path: '/panel-left/',
    component: PanelLeftPage,
  },
  {
    path: '/panel-right/',
    component: PanelRightPage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
