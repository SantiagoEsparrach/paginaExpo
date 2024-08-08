/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Materiales: {
    Base: '/materiales',
    Get: '/',
    GetOne: '/:id',
    GetAllDays: '/dias',
    Add: '/',
    Update: '/',
    Delete: '/:id',
  },
} as const;
