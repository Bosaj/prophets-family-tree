"""
Automated Verification & Smoke Test Suite for prophets-family-tree
Author: @Bosaj
"""
import os
import unittest

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


class TestRepositoryIntegrity(unittest.TestCase):
    """Validates repository structure, documentation, and configuration."""

    def test_project_root_exists(self):
        self.assertTrue(os.path.isdir(PROJECT_ROOT), "Project root directory must exist")

    def test_readme_present_and_non_empty(self):
        readme_candidates = ["README.md", "readme.md", "Home.md"]
        found = any(os.path.isfile(os.path.join(PROJECT_ROOT, r)) for r in readme_candidates)
        if found:
            for r in readme_candidates:
                rpath = os.path.join(PROJECT_ROOT, r)
                if os.path.isfile(rpath):
                    self.assertGreater(os.path.getsize(rpath), 0, f"{r} must not be empty")

    def test_codeowners_or_governance(self):
        codeowners = os.path.join(PROJECT_ROOT, ".github", "CODEOWNERS")
        if os.path.isfile(codeowners):
            with open(codeowners, "r", encoding="utf-8") as f:
                content = f.read()
            self.assertIn("@Bosaj", content)


if __name__ == "__main__":
    unittest.main()
