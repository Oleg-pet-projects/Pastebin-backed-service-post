export const formatNameProject = (str: String): String => str.replace(/-/g, ' ');

export const formatVersionProject = (str: String): String => `v${str.split('.')[0]}`;

export default { formatNameProject, formatVersionProject };
