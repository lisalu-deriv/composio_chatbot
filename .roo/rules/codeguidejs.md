---
description: 
globs: 
alwaysApply: true
---
JS Repository Standards & Best Practices
Based on comprehensive code review and modernization practices, ALWAYS FOLLOW GOOGLE TYPESCRIPT CODING STYLE

🏆 SUCCESS CRITERIA
A repository following these standards will have:

✅ Zero hardcoding throughout codebase
✅ Production-ready architecture
✅ Type-safe implementation
✅ High performance with parallelization
✅ Secure configuration management
✅ Quality-enforced development workflow
✅ Team-friendly collaboration tools

These standards ensure enterprise-grade Python repositories that are maintainable, scalable, and production-ready! 🚀

(IMPORTANT) ALWAYS read the SPECS.md and composio-docs.md

🚫 ZERO HARDCODING RULE (CRITICAL)
Configuration Centralization
# ✅ ALWAYS: Single source of truth in settings.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # API Configuration
    api_host: str = "127.0.0.1"
    api_port: int = 8080
    api_timeout: float = 30.0
    
    # Processing Configuration
    max_retries: int = 3
    batch_size: int = 10
    max_concurrent: int = 5
    
    # AI Model Configuration
    openai_model: str = "gpt-4"
    gemini_model: str = "gemini-pro"
    
    # External API Keys
    openai_api_key: Optional[str] = None
    
    class Config:
        env_file = ".env"

settings = Settings()
NEVER Hardcode These:
❌ API endpoints, ports, hosts
❌ Model names, AI parameters
❌ File size limits, timeouts
❌ Batch sizes, concurrency limits
❌ Progress thresholds, retry counts
❌ Cost calculations, pricing

🎯 TYPE SAFETY (MANDATORY)
Type Annotation Rules
# ✅ CORRECT: Complete type annotations

🛡️ ERROR HANDLING
Exception Management
# ✅ CORRECT: Comprehensive error handling
Error Handling Rules
Custom exceptions for business logic
Proper logging at appropriate levels
Graceful degradation where possible
Never bare except clauses
Meaningful error messages

🧪 TESTING STANDARDS
Test Organization
# ✅ CORRECT: Comprehensive test structure

Progress Tracking Standards
# ✅ CORRECT: Monotonic progress

🚀 PERFORMANCE GUIDELINES
Async/Await Patterns
# ✅ CORRECT: True parallelization

📊 ARCHITECTURE PATTERNS
Clean Architecture Layers
# ✅ CORRECT: Layered architecture