// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using EventMonitoring.ConfigurationManagement.Core.DTOs;
using EventMonitoring.ConfigurationManagement.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EventMonitoring.ConfigurationManagement.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FileController : ControllerBase
{
    private readonly IConfigurationFileRepository configurationFileRepository;
    private readonly ILogger<FileController> logger;

    public FileController(
        IConfigurationFileRepository configurationFileRepository,
        ILogger<FileController> logger)
    {
        this.configurationFileRepository = configurationFileRepository ?? throw new ArgumentNullException(nameof(configurationFileRepository));
        this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ConfigurationFileDto>>> GetAll(CancellationToken cancellationToken)
    {
        logger.LogInformation("Getting all configuration files");
        var files = await configurationFileRepository.GetAllAsync(cancellationToken);
        var dtos = files.Select(f => new ConfigurationFileDto
        {
            ConfigurationFileId = f.ConfigurationFileId,
            Name = f.Name,
            Path = f.Path,
            Description = f.Description,
            Version = f.Version,
            IsActive = f.IsActive,
            CreatedAt = f.CreatedAt,
            UpdatedAt = f.UpdatedAt
        });
        return Ok(dtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ConfigurationFileDto>> GetById(Guid id, CancellationToken cancellationToken)
    {
        logger.LogInformation("Getting configuration file by id: {Id}", id);
        var file = await configurationFileRepository.GetByIdAsync(id, cancellationToken);
        if (file == null)
        {
            return NotFound();
        }

        var dto = new ConfigurationFileDto
        {
            ConfigurationFileId = file.ConfigurationFileId,
            Name = file.Name,
            Path = file.Path,
            Description = file.Description,
            Version = file.Version,
            IsActive = file.IsActive,
            CreatedAt = file.CreatedAt,
            UpdatedAt = file.UpdatedAt
        };
        return Ok(dto);
    }

    [HttpGet("by-path")]
    public async Task<ActionResult<ConfigurationFileDto>> GetByPath([FromQuery] string path, CancellationToken cancellationToken)
    {
        logger.LogInformation("Getting configuration file by path: {Path}", path);
        var file = await configurationFileRepository.GetByPathAsync(path, cancellationToken);
        if (file == null)
        {
            return NotFound();
        }

        var dto = new ConfigurationFileDto
        {
            ConfigurationFileId = file.ConfigurationFileId,
            Name = file.Name,
            Path = file.Path,
            Description = file.Description,
            Version = file.Version,
            IsActive = file.IsActive,
            CreatedAt = file.CreatedAt,
            UpdatedAt = file.UpdatedAt
        };
        return Ok(dto);
    }
}