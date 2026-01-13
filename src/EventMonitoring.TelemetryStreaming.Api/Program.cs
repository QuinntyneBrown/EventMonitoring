// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using EventMonitoring.TelemetryStreaming.Api.Hubs;
using EventMonitoring.TelemetryStreaming.Api.Services;
using EventMonitoring.TelemetryStreaming.Core.Interfaces;
using EventMonitoring.TelemetryStreaming.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();
builder.Services.AddInfrastructureServices(builder.Configuration);

// Register SignalR telemetry publisher
builder.Services.AddSingleton<ITelemetryPublisher, SignalRTelemetryPublisher>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.MapHub<TelemetryHub>("/telemetry");

app.Run();
