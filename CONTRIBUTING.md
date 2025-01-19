# Contributing to Invoicen

Thank you for considering contributing to **Invoicen**! We welcome all contributions and are excited to have you on board. This document will guide you through the process of contributing to our project.

Please note that by contributing, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## Getting Started

To get started with contributing, please follow the steps below:

1. **Fork and Clone the Repository**

   - Fork the repository by clicking the "Fork" button at the top right of this page.
   - Clone the repository locally:

     ```bash
     git clone https://github.com/<your-username>/invoicen.git
     cd invoicen
     ```

2. **Set Up the Project**

   - Ensure you have the following installed:
     - Node.js (v16 or higher)
     - pnpm (v8 or higher)
     - PostgreSQL
     - Redis
     - MinIO
   - Install dependencies:

     ```bash
     pnpm install
     ```

   - Set up the environment variables by copying `.env.example` to `.env` and updating the values as per your setup:

     ```bash
     cp .env.example .env
     ```

   - Run the development environment:

     ```bash
     pnpm dev
     ```

3. **Monorepo Structure**
   - The repository follows a monorepo structure with the following key directories:
     - **apps/**: Contains the main application and services.
     - **packages/**: Shared libraries and utilities.
     - **tooling/**: Development tools and configurations.
   - Each directory has its own `README.md` for more details.

---

## Making Changes

To contribute effectively, follow these steps:

1. **Create a Branch**

   - Use a descriptive branch name:

     ```bash
     git checkout -b feature/your-feature-name
     ```

2. **Implement Your Changes**

   - Follow coding standards and ensure proper documentation.
   - If you're working on APIs, update the Swagger configuration.
   - Run tests to ensure your changes don't break existing functionality:

     ```bash
     pnpm test
     ```

3. **Commit Your Changes**

   - Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages. Example:

     ```
     feat(auth): add user login endpoint
     fix(storage): resolve bucket creation error
     ```

4. **Push and Open a Pull Request**

   - Push your branch to your fork:

     ```bash
     git push origin feature/your-feature-name
     ```

   - Open a pull request (PR) against the `main` branch.
   - Provide a detailed description of your changes in the PR.

---

## Contribution Guidelines

To ensure a smooth contribution process:

- **Focus Your Changes**: Keep PRs small and focused on a single feature or fix.
- **Write Tests**: Add tests for new functionality or bug fixes.
- **Maintain Documentation**: Update relevant documentation in the codebase.
- **Follow Linting and Formatting Rules**:

  ```bash
  pnpm lint
  pnpm format
  ```

- **Check for Breaking Changes**: Ensure your changes are backward-compatible unless a major version update is planned.

---

## Development Environment Details

Here is a quick reference for setting up the environment variables:

```plaintext
PORT=8080

# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_SCHEMA=public

# MinIO
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin
MINIO_PORT=9000

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=password

# SMTP
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_USER=keizer
MAIL_FROM=auth@keizer.com
```

---

## Testing and Validation

- Run all unit tests:

  ```bash
  pnpm test
  ```

- Run linting and formatting checks:

  ```bash
  pnpm lint
  pnpm format
  ```

- Use the staging environment for testing end-to-end functionality before merging.

---

## Useful Resources

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [About Pull Requests](https://help.github.com/articles/about-pull-requests/)
- [GitHub Help](https://help.github.com)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Conventional Commits VSCode Extension](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits)
- [GitHub Issues and Pull Requests VSCode Extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)

---

Thank you for your interest in contributing to **Invoicen**! If you have any questions, feel free to open an issue or reach out to the team. We're excited to collaborate with you.
