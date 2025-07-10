'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import casesMeta from '../utils/casesMeta';
import { motion } from 'framer-motion';

export default function TechProjectNetwork() {
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredTech, setHoveredTech] = useState(null);

  useEffect(() => {
    function updateDimensions() {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    }
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;

  const outerRadiusX = centerX * 0.9;
  const outerRadiusY = centerY * 0.8; // 🔧 aumentamos de 0.6 a 0.8 para distribuir mejor verticalmente
  const innerRadiusX = outerRadiusX * 0.5;
  const innerRadiusY = outerRadiusY * 0.5;

  const shuffledTechList = useMemo(() => {
    const techListRaw = Array.from(new Set(casesMeta.flatMap(c => c.tech)));
    return techListRaw.sort(() => Math.random() - 0.5);
  }, []);

  const allItems = useMemo(() => {
    return [
      ...casesMeta.map(c => ({ type: 'project', name: c.name })),
      ...shuffledTechList.map(t => ({ type: 'tech', name: t })),
    ];
  }, [shuffledTechList]);

  const techPositions = shuffledTechList.map((tech, idx) => ({
    name: tech,
    x: centerX + outerRadiusX * Math.cos((2 * Math.PI * idx) / shuffledTechList.length),
    y: centerY + outerRadiusY * Math.sin((2 * Math.PI * idx) / shuffledTechList.length),
  }));

  const projectPositions = casesMeta.map((p, idx) => {
    let size = 100;
    if (p.name === 'Morningstar') size = 60;
    if (p.name === 'Inquilia') size = 90;
    if (p.name === 'CD648') size = 130;
    if (p.name === 'Quimialcla') size = 120;

    return {
      name: p.name,
      logo: p.logo,
      url: p.url,
      size,
      x: centerX + innerRadiusX * Math.cos((2 * Math.PI * idx) / casesMeta.length),
      y: centerY + innerRadiusY * Math.sin((2 * Math.PI * idx) / casesMeta.length),
    };
  });

  const applyOffset = (from, to, distance) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length === 0) return { x: from.x, y: from.y };
    const offsetX = (dx / length) * distance;
    const offsetY = (dy / length) * distance;
    return {
      x: from.x + offsetX,
      y: from.y + offsetY,
    };
  };

  const startAutoHover = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const randomItem = allItems[Math.floor(Math.random() * allItems.length)];
      setHoveredProject(randomItem.type === 'project' ? randomItem.name : null);
      setHoveredTech(randomItem.type === 'tech' ? randomItem.name : null);
    }, 3000);
  };

  useEffect(() => {
    startAutoHover();
    return () => clearInterval(intervalRef.current);
  }, [allItems]);

  const handleMouseEnterProject = (name) => {
    clearInterval(intervalRef.current);
    setHoveredProject(name);
    setHoveredTech(null);
  };

  const handleMouseEnterTech = (name) => {
    clearInterval(intervalRef.current);
    setHoveredTech(name);
    setHoveredProject(null);
  };

  const handleMouseLeave = () => {
    setHoveredProject(null);
    setHoveredTech(null);
    startAutoHover();
  };

  return (
    <div ref={containerRef} className="relative w-full h-[900px] select-none">
      <svg width="100%" height="100%" className="absolute top-0 left-0 z-0">
        {casesMeta.flatMap(project => {
          const projPos = projectPositions.find(p2 => p2.name === project.name);
          return project.tech.map(tech => {
            const techPos = techPositions.find(t => t.name === tech);
            if (!projPos || !techPos) return null;

            const logoOffset = applyOffset(projPos, techPos, projPos.size / 2);

            const isHighlighted =
              (hoveredProject && hoveredProject === project.name) ||
              (hoveredTech && hoveredTech === tech);

            return (
              <motion.line
                key={`${project.name}-${tech}`}
                x1={techPos.x}
                y1={techPos.y}
                x2={logoOffset.x}
                y2={logoOffset.y}
                stroke={isHighlighted ? '#104E4E' : '#6A757A'}
                strokeWidth={1}
                strokeLinecap="round"
                animate={{
                  opacity: hoveredProject || hoveredTech ? (isHighlighted ? 1 : 0.1) : 0.4,
                }}
                transition={{ duration: 0.3 }}
              />
            );
          });
        })}
      </svg>

      {techPositions.map(tech => {
        const isHighlighted =
          (hoveredProject &&
            casesMeta.find(c => c.name === hoveredProject)?.tech.includes(tech.name)) ||
          hoveredTech === tech.name;

        return (
          <motion.div
            key={tech.name}
            className="absolute text-xs rounded-full border border-codiva-secondary whitespace-nowrap"
            style={{
              left: tech.x,
              top: tech.y,
              translateX: '-50%',
              translateY: '-50%',
              height: '40px',
              paddingLeft: '12px',
              paddingRight: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isHighlighted ? '#104E4E' : '#E5E7EB',
              color: isHighlighted ? '#FFFFFF' : '#6A757A',
              zIndex: 10,
            }}
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onMouseEnter={() => handleMouseEnterTech(tech.name)}
            onMouseLeave={handleMouseLeave}
          >
            {tech.name}
          </motion.div>
        );
      })}

      {projectPositions.map(project => (
        <a
          key={project.name}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute flex items-center justify-center"
          style={{
            left: `${project.x - project.size / 2}px`,
            top: `${project.y - project.size / 2}px`,
            width: `${project.size}px`,
            height: `${project.size}px`,
            zIndex: 20,
          }}
          onMouseEnter={() => handleMouseEnterProject(project.name)}
          onMouseLeave={handleMouseLeave}
        >
          <motion.img
            src={project.logo}
            alt={project.name}
            className="object-contain cursor-pointer"
            style={{ width: '100%', height: '100%' }}
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          />
        </a>
      ))}
    </div>
  );
}